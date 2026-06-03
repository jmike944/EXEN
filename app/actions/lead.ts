"use server";

import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(2, "Ingresa tu nombre"),
  phone: z
    .string()
    .refine((v) => v.replace(/\D/g, "").length >= 8, "Teléfono inválido"),
  email: z.string().email("Correo inválido"),
  dev: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
});

const scheduleSchema = z.object({
  name: z.string().min(2),
  phone: z
    .string()
    .refine((v) => v.replace(/\D/g, "").length >= 8, "Teléfono inválido"),
  dev: z.string().optional(),
  date: z.string().min(1, "Elige una fecha"),
  time: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type ScheduleInput = z.infer<typeof scheduleSchema>;

export async function submitLead(input: LeadInput) {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, errors: parsed.error.flatten().fieldErrors };
  }
  // TODO: replace with real CRM/email integration.
  console.log("[EXEN lead]", parsed.data);
  return { ok: true as const };
}

export async function submitSchedule(input: ScheduleInput) {
  const parsed = scheduleSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, errors: parsed.error.flatten().fieldErrors };
  }
  // TODO: replace with real CRM/email integration.
  console.log("[EXEN schedule]", parsed.data);
  return { ok: true as const };
}
