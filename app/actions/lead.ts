"use server";

import { z } from "zod";
import { DEV_OPTIONS } from "@/lib/dev-options";
import {
  getGhlAuth,
  pipelineForDev,
  upsertContact,
  createOpportunity,
  postConversationMessage,
  type LeadInput as GhlLead,
} from "@/lib/ghl";

const DEV_SLUGS = DEV_OPTIONS.map((d) => d.slug) as [string, ...string[]];
const DEV_NAME = Object.fromEntries(DEV_OPTIONS.map((d) => [d.slug, d.name]));

// Every EXEN lead belongs to a desarrollo — the main form picks it from a
// dropdown, desarrollo pages preselect it. So `dev` is required and must be a
// known slug (this is what routes the lead to the right GHL pipeline).
const leadSchema = z.object({
  firstName: z.string().min(2, "Ingresa tu nombre"),
  lastName: z.string().min(2, "Ingresa tu apellido"),
  phone: z
    .string()
    .refine((v) => v.replace(/\D/g, "").length >= 8, "Teléfono inválido"),
  email: z.string().email("Correo inválido"),
  dev: z.enum(DEV_SLUGS, { message: "Elige un desarrollo" }),
  message: z.string().optional(),
  source: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

const GENERIC_ERROR =
  "Algo salió mal. Intenta de nuevo o escríbenos por WhatsApp.";

/**
 * Push a lead into GoHighLevel: upsert the contact (critical), then — best
 * effort — open an opportunity in the desarrollo's pipeline and drop the
 * message into Conversations. A flaky secondary call must not lose the lead.
 * Returns false only if the contact itself couldn't be captured.
 */
async function pushToGhl(lead: GhlLead, devSlug: string): Promise<boolean> {
  let auth;
  try {
    auth = getGhlAuth();
  } catch (err) {
    console.error("[EXEN lead] GHL not configured:", err);
    return false;
  }

  let contactId: string;
  try {
    contactId = await upsertContact(auth, lead);
  } catch (err) {
    console.error("[EXEN lead] upsertContact failed:", err);
    return false;
  }

  const pipeline = pipelineForDev(devSlug);
  if (!pipeline) {
    console.warn(
      `[EXEN lead] no GHL pipeline for "${devSlug}" — contact captured, opportunity skipped`,
    );
  }

  const conversationText = lead.message
    ? `${lead.source}. Mensaje: "${lead.message}"`
    : `${lead.source}.`;

  const results = await Promise.allSettled([
    pipeline
      ? createOpportunity(auth, pipeline, contactId, lead)
      : Promise.resolve(),
    postConversationMessage(auth, contactId, conversationText),
  ]);
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`[EXEN lead] secondary step ${i} failed:`, r.reason);
    }
  });

  return true;
}

export async function submitLead(input: LeadInput) {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, errors: parsed.error.flatten().fieldErrors };
  }

  const { dev, ...rest } = parsed.data;
  const source = `Sitio web — ${DEV_NAME[dev]}`;
  const ok = await pushToGhl({ ...rest, source }, dev);
  if (!ok) return { ok: false as const, formError: GENERIC_ERROR };
  return { ok: true as const };
}
