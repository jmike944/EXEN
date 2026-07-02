// GoHighLevel (LeadConnector) API v2 client — server-only.
// Never import this into a client component; it reads secret env vars.
//
// Unlike a single-pipeline site, EXEN routes each lead to the pipeline that
// matches the desarrollo it came from (see PIPELINES below). The `dev` slug the
// forms collect is the routing key.

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

/** Pipeline + first-stage ("Nuevo Lead") IDs for one desarrollo. */
export type Pipeline = { pipelineId: string; stageId: string };

/**
 * Per-desarrollo pipeline routing, keyed by the dev slug used across the site
 * (lib/developments.ts / lib/dev-options.ts). Every EXEN lead lands in its
 * desarrollo's pipeline, first stage "Nuevo Lead".
 *
 * IDs discovered live from GHL (sub-account FyeVMEexgxy5PADUnMA0 — shared with
 * TERA). `null` = the desarrollo has no pipeline in GHL yet; leads for it still
 * capture the Contact + message, only the Opportunity is skipped. Create the
 * pipeline in GHL, then fill in its id + "Nuevo Lead" stage id here.
 */
export const PIPELINES: Record<string, Pipeline | null> = {
  ronsesvalles: {
    pipelineId: "8CMXKda8bI0BCR17ZTNr",
    stageId: "89d83d81-82d0-4e34-929d-8bf273046dae",
  },
  "aura-place": {
    pipelineId: "X8uY7alOSURrwmiQmq3X",
    stageId: "bdfcfba5-2c05-403c-b874-ed7600000e67",
  },
  "cumbres-de-arteaga": {
    pipelineId: "u5f2bNQ3oAoP9Flc03y0",
    stageId: "79bad1a7-07fa-4197-b6d7-f03bd70b4eb0",
  },
  "privada-bosque-sur": {
    pipelineId: "61gzuByWIpumKDntJ0Bn",
    stageId: "8f08e14f-1b2d-4bdc-8857-0953523373b5",
  },
  "hacienda-el-milagro": {
    pipelineId: "lJBQtPlS3wtrzaGGiudM",
    stageId: "ef0ae65b-b839-453e-9d71-34d45a8a4466",
  },
  "la-joya-residencial": {
    pipelineId: "VwiOx4ET9E8he4umXL2z",
    stageId: "f19220c0-f9a7-4cab-8092-70837e4b2f62",
  },
  "fuentes-de-arteaga": {
    pipelineId: "SmEHE9qwLP1eFVadypzG",
    stageId: "4efb2e6b-684a-4b95-88ea-4925cecc9811",
  },
};

/** Look up the pipeline for a dev slug. Returns null if unknown or not yet created. */
export function pipelineForDev(slug: string | undefined): Pipeline | null {
  if (!slug) return null;
  return PIPELINES[slug] ?? null;
}

type GhlAuth = { token: string; locationId: string };

/** Reads + validates the GHL secret env vars. Throws if any are missing. */
export function getGhlAuth(): GhlAuth {
  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) {
    throw new Error("Missing GHL_API_TOKEN / GHL_LOCATION_ID environment variables");
  }
  return { token, locationId };
}

function headers(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Version: GHL_VERSION,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

async function ghlFetch(
  token: string,
  method: "POST" | "PUT",
  path: string,
  body: unknown,
): Promise<{ ok: boolean; status: number; data: any }> {
  const res = await fetch(`${GHL_BASE}${path}`, {
    method,
    headers: headers(token),
    body: JSON.stringify(body),
  });
  let data: any = null;
  try {
    data = await res.json();
  } catch {
    // non-JSON body; leave data null
  }
  return { ok: res.ok, status: res.status, data };
}

/** Normalize a Mexican phone to E.164. Falls back to digits with +52. */
export function normalizePhoneMx(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.startsWith("+")) return "+" + trimmed.slice(1).replace(/\D/g, "");
  const digits = trimmed.replace(/\D/g, "");
  if (digits.startsWith("52")) return "+" + digits;
  return "+52" + digits;
}

export type LeadInput = {
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  message?: string;
  /** Human-readable lead source recorded in GHL (e.g. "Sitio web — Ronsesvalles"). */
  source: string;
};

/** Full display name from first + last. */
export function fullName(lead: LeadInput): string {
  return `${lead.firstName} ${lead.lastName}`.trim();
}

/**
 * Create or update the contact (dedup by email/phone). Returns the contactId.
 * This is the critical call — a failure here means we couldn't capture the lead.
 */
export async function upsertContact(
  auth: GhlAuth,
  lead: LeadInput,
): Promise<string> {
  // NOTE: do not send `name` alongside firstName/lastName — GHL prioritizes
  // `name`, re-splits it, and lowercases the result, clobbering our fields.
  const { ok, status, data } = await ghlFetch(auth.token, "POST", "/contacts/upsert", {
    locationId: auth.locationId,
    firstName: lead.firstName,
    lastName: lead.lastName,
    ...(lead.email ? { email: lead.email } : {}),
    phone: normalizePhoneMx(lead.phone),
    source: lead.source,
    tags: ["Sitio web"],
  });
  const contactId: string | undefined = data?.contact?.id ?? data?.id;
  if (!ok || !contactId) {
    throw new Error(
      `GHL upsertContact failed (${status}): ${JSON.stringify(data)?.slice(0, 300)}`,
    );
  }

  // The upsert endpoint lowercases firstName/lastName (create & update don't).
  // Restore the original casing with a follow-up update — best-effort cosmetic.
  const update = await ghlFetch(auth.token, "PUT", `/contacts/${contactId}`, {
    firstName: lead.firstName,
    lastName: lead.lastName,
  });
  if (!update.ok) {
    console.error(
      `GHL contact case-fix failed (${update.status}): ${JSON.stringify(update.data)?.slice(0, 150)}`,
    );
  }
  return contactId;
}

/** Create an opportunity in the desarrollo's pipeline, first stage. Best-effort. */
export async function createOpportunity(
  auth: GhlAuth,
  pipeline: Pipeline,
  contactId: string,
  lead: LeadInput,
): Promise<void> {
  const { ok, status, data } = await ghlFetch(auth.token, "POST", "/opportunities/", {
    pipelineId: pipeline.pipelineId,
    pipelineStageId: pipeline.stageId,
    locationId: auth.locationId,
    contactId,
    name: fullName(lead),
    status: "open",
    source: lead.source,
  });
  if (!ok) {
    // The contact already has an opportunity (repeat submit, or a GHL automation
    // opened one from the new contact). The opportunity exists — treat as success.
    const msg = String(data?.message ?? "").toLowerCase();
    if (status === 400 && msg.includes("duplicate opportunity")) return;
    throw new Error(
      `GHL createOpportunity failed (${status}): ${JSON.stringify(data)?.slice(0, 300)}`,
    );
  }
}

/**
 * Post the lead's message into the contact's conversation so it lands in the
 * Conversations inbox. Uses an inbound "Live_Chat" message — the website-chat
 * channel, which is the honest fit for a web form. Falls back to a contact Note
 * if it's rejected. Best-effort.
 */
export async function postConversationMessage(
  auth: GhlAuth,
  contactId: string,
  text: string,
): Promise<void> {
  const inbound = await ghlFetch(
    auth.token,
    "POST",
    "/conversations/messages/inbound",
    { type: "Live_Chat", contactId, message: text },
  );
  if (inbound.ok) return;

  console.error(
    `GHL inbound message failed (${inbound.status}): ${JSON.stringify(inbound.data)?.slice(0, 200)} — falling back to Note`,
  );
  const note = await ghlFetch(auth.token, "POST", `/contacts/${contactId}/notes`, {
    body: text,
  });
  if (!note.ok) {
    throw new Error(
      `GHL note failed (${note.status}): ${JSON.stringify(note.data)?.slice(0, 200)}`,
    );
  }
}
