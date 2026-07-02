# GoHighLevel Lead Integration

Wires EXEN's contact forms to GoHighLevel (GHL) so each submission becomes a lead
in the CRM, **routed to the pipeline of the desarrollo it's about**.

Modeled on the TERA integration, with one key difference: TERA sent every lead to
a single pipeline; EXEN has one pipeline per desarrollo and routes by the `dev`
slug the forms collect.

## Routing model

- **Every lead belongs to a desarrollo.** The main-page `LeadForm` picks it from a
  required dropdown (the "catch-all" form); each desarrollo page preselects its own
  (`preselectDev={dev.slug}`). The `ScheduleDialog` works the same way.
- The `dev` slug maps to a GHL pipeline in `lib/ghl.ts` → `PIPELINES`. The lead's
  opportunity opens in that pipeline's first stage, **"Nuevo Lead"**.
- There is no "undecided" option — the desarrollo is always chosen.

## Architecture

```
LeadForm / ScheduleDialog (client)  ──server action──▶  app/actions/lead.ts  ──▶  GoHighLevel API v2
  name/phone/email/msg + dev slug                        validate + route by dev      (token stays server-side)
```

The GHL Private Integration token never reaches the browser — the forms call
server actions (`submitLead`, `submitSchedule`), which use the server-only
`lib/ghl.ts` client.

## Server flow (`app/actions/lead.ts`)

1. Validate with zod. `dev` must be a known slug (routes the lead).
2. `upsertContact` — `POST /contacts/upsert` (+ `PUT /contacts/{id}` to restore
   name casing, which upsert lowercases). Dedup by email/phone. **Critical call** —
   a failure here returns a form error to the user.
3. `createOpportunity` — `POST /opportunities/` into the desarrollo's pipeline,
   stage "Nuevo Lead". **Best-effort.** A `400 "duplicate opportunity"` (repeat
   submit, or a GHL automation already opened one) is treated as success.
4. `postConversationMessage` — inbound `Live_Chat` message into Conversations,
   combining the source + typed message. Falls back to a contact **Note** if
   rejected. **Best-effort.**

Steps 3 & 4 run via `Promise.allSettled`: one flaky secondary call is logged but
never loses the lead or blocks the visitor.

## Pipeline mapping (`lib/ghl.ts` → `PIPELINES`)

IDs discovered live from GHL (sub-account `FyeVMEexgxy5PADUnMA0`, **shared with
TERA**). Keyed by dev slug:

| Desarrollo (slug) | GHL pipeline | Status |
|---|---|---|
| `ronsesvalles` | Ronsesvalles | ✅ mapped |
| `aura-place` | Aura Place | ✅ mapped |
| `cumbres-de-arteaga` | Cumbres de Arteaga | ✅ mapped |
| `privada-bosque-sur` | Privada Bosque Sur | ✅ mapped |
| `hacienda-el-milagro` | Hacienda El Milagro | ✅ mapped |
| `la-joya-residencial` | La Joya Residencial I y II | ✅ mapped |
| `fuentes-de-arteaga` | Fuentes de Arteaga | ✅ mapped |

All seven desarrollos now route to their own pipeline. If a slug is ever mapped
to `null`, the lead still captures the **Contact + conversation message** — only
the Opportunity is skipped (logged as a warning). Each pipeline was created with
the same six stages (`Nuevo Lead` → `Contactado` → `Agendo Cita` →
`Cita / Cotizacion` → `Separacion` → `Enganche / Cierre`) via
`POST /opportunities/pipelines`. Re-discover ids anytime with:

```
curl -s "https://services.leadconnectorhq.com/opportunities/pipelines?locationId=$GHL_LOCATION_ID" \
  -H "Authorization: Bearer $GHL_API_TOKEN" -H "Version: 2021-07-28"
```

## Environment variables (server-only, `.env.local`, git-ignored)

| Var | Value |
|-----|-------|
| `GHL_API_TOKEN` | Private Integration token (`pit-…`) — shared with TERA |
| `GHL_LOCATION_ID` | `FyeVMEexgxy5PADUnMA0` |

Per-desarrollo pipeline/stage IDs are **not** env vars — they live in
`lib/ghl.ts` next to the dev slugs (they aren't secret and track the code's
desarrollos). For production, add the two vars in Vercel. **Never** prefix with
`NEXT_PUBLIC_`.

## Out of scope (YAGNI)

No reCAPTCHA/spam protection, no rate limiting, no email notifications from our
side (GHL workflows own that).

## Notes

- Next.js 16 / React 19. Forms use server actions, not a route handler.
- GHL API base: `https://services.leadconnectorhq.com`, header `Version: 2021-07-28`.
