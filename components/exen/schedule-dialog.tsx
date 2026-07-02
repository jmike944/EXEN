"use client";

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DEV_OPTIONS } from "@/lib/dev-options";
import { waLink } from "@/lib/company";
import { submitSchedule } from "@/app/actions/lead";
import { WhatsAppIcon } from "./whatsapp-icon";

const SLOTS = ["10:00", "11:30", "13:00", "16:00", "17:30", "19:00"] as const;

const schema = z.object({
  firstName: z.string().min(2, "Ingresa tu nombre"),
  lastName: z.string().min(2, "Ingresa tu apellido"),
  phone: z
    .string()
    .refine((v) => v.replace(/\D/g, "").length >= 8, "Teléfono inválido"),
  dev: z.string().min(1, "Elige un desarrollo"),
  date: z.string().min(1, "Elige una fecha"),
});
type FormValues = z.infer<typeof schema>;

export function ScheduleDialog({
  trigger,
  preselectDev,
}: {
  trigger: ReactNode;
  preselectDev?: string;
}) {
  const [open, setOpen] = useState(false);
  const [slot, setSlot] = useState<string>(SLOTS[0]);
  const [success, setSuccess] = useState<{ name: string; wa: string } | null>(
    null
  );
  const [formError, setFormError] = useState<string | null>(null);

  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { dev: preselectDev ?? DEV_OPTIONS[0].slug, date: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setFormError(null);
    const res = await submitSchedule({ ...values, time: slot });
    if (!res.ok) {
      if (res.formError) setFormError(res.formError);
      return;
    }
    const devName =
      DEV_OPTIONS.find((d) => d.slug === values.dev)?.name ??
      "uno de los desarrollos";
    const first = values.firstName;
    const fullName = `${values.firstName} ${values.lastName}`.trim();
    const wa = waLink(
      `Hola EXEN, quiero agendar una visita a ${devName} el ${values.date} a las ${slot}. Mi nombre es ${fullName}.`
    );
    setSuccess({ name: first, wa });
  };

  const handleOpen = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setTimeout(() => {
        setSuccess(null);
        setFormError(null);
        reset();
        setSlot(SLOTS[0]);
      }, 200);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden bg-card text-foreground">
        {!success ? (
          <>
            <DialogHeader className="px-7 pt-7 pb-2">
              <span className="eyebrow">Visita guiada</span>
              <DialogTitle className="text-2xl font-semibold text-[color:var(--c-navy)]">
                Agenda una visita
              </DialogTitle>
              <DialogDescription className="text-[color:var(--c-muted)]">
                Conoce el desarrollo con uno de nuestros asesores. Te
                confirmamos por WhatsApp.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="px-7 pb-7 pt-3"
              noValidate
            >
              <div className="field-row2">
                <div className={`field${errors.firstName ? " has-error" : ""}`}>
                  <label>
                    Nombre <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    autoComplete="given-name"
                    {...register("firstName")}
                  />
                  <div className="err">
                    {errors.firstName?.message ?? "Ingresa tu nombre"}
                  </div>
                </div>
                <div className={`field${errors.lastName ? " has-error" : ""}`}>
                  <label>
                    Apellido <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Tu apellido"
                    autoComplete="family-name"
                    {...register("lastName")}
                  />
                  <div className="err">
                    {errors.lastName?.message ?? "Ingresa tu apellido"}
                  </div>
                </div>
              </div>
              <div className="field-row2">
                <div className={`field${errors.phone ? " has-error" : ""}`}>
                  <label>
                    Teléfono <span className="req">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="844 000 0000"
                    autoComplete="tel"
                    {...register("phone")}
                  />
                  <div className="err">
                    {errors.phone?.message ?? "Teléfono inválido"}
                  </div>
                </div>
                <div className="field">
                  <label>Desarrollo</label>
                  <select {...register("dev")}>
                    {DEV_OPTIONS.map((d) => (
                      <option key={d.slug} value={d.slug}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={`field${errors.date ? " has-error" : ""}`}>
                <label>
                  Fecha preferida <span className="req">*</span>
                </label>
                <input type="date" min={today} {...register("date")} />
                <div className="err">
                  {errors.date?.message ?? "Elige una fecha"}
                </div>
              </div>
              <div className="field">
                <label>Horario</label>
                <div className="slot-grid">
                  {SLOTS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`slot${s === slot ? " is-active" : ""}`}
                      onClick={() => setSlot(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              {formError ? (
                <div className="form-error" role="alert" style={{ marginTop: ".4rem" }}>
                  {formError}
                </div>
              ) : null}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn--primary btn--block btn--lg"
                style={{ marginTop: ".4rem" }}
              >
                {isSubmitting ? "Enviando…" : "Confirmar visita"}
              </button>
            </form>
          </>
        ) : (
          <div className="form-success" style={{ paddingTop: "3rem" }}>
            <div className="badge">
              <Check />
            </div>
            <h3>¡Visita agendada!</h3>
            <p>
              Gracias <span>{success.name}</span>, un asesor de EXEN te
              contactará para confirmar tu cita.
            </p>
            <a
              className="btn btn--wa"
              href={success.wa}
              target="_blank"
              rel="noopener"
            >
              Confirmar por WhatsApp <WhatsAppIcon />
            </a>
            <DialogClose asChild>
              <button type="button" className="btn btn--ghost btn--sm">
                Cerrar
              </button>
            </DialogClose>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
