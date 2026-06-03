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
import { DEVS } from "@/lib/developments";
import { waLink } from "@/lib/company";
import { submitSchedule } from "@/app/actions/lead";
import { WhatsAppIcon } from "./whatsapp-icon";

const SLOTS = ["10:00", "11:30", "13:00", "16:00", "17:30", "19:00"] as const;

const schema = z.object({
  name: z.string().min(2, "Ingresa tu nombre"),
  phone: z
    .string()
    .refine((v) => v.replace(/\D/g, "").length >= 8, "Teléfono inválido"),
  dev: z.string().optional(),
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

  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { dev: preselectDev ?? DEVS[0].slug, date: "" },
  });

  const onSubmit = async (values: FormValues) => {
    const res = await submitSchedule({ ...values, time: slot });
    if (!res.ok) return;
    const devName =
      DEVS.find((d) => d.slug === values.dev)?.name ??
      "uno de los desarrollos";
    const first = values.name.split(" ")[0] ?? "";
    const wa = waLink(
      `Hola EXEN, quiero agendar una visita a ${devName} el ${values.date} a las ${slot}. Mi nombre es ${values.name}.`
    );
    setSuccess({ name: first, wa });
  };

  const handleOpen = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setTimeout(() => {
        setSuccess(null);
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
              <div className={`field${errors.name ? " has-error" : ""}`}>
                <label>
                  Nombre completo <span className="req">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  autoComplete="name"
                  {...register("name")}
                />
                <div className="err">
                  {errors.name?.message ?? "Ingresa tu nombre"}
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
                    {DEVS.map((d) => (
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
