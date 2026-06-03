"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check } from "lucide-react";
import { DEVS } from "@/lib/developments";
import { waLink, waDevMessage, WA_DEFAULT_MESSAGE } from "@/lib/company";
import { submitLead } from "@/app/actions/lead";
import { WhatsAppIcon } from "./whatsapp-icon";

const schema = z.object({
  name: z.string().min(2, "Ingresa tu nombre"),
  phone: z
    .string()
    .refine((v) => v.replace(/\D/g, "").length >= 8, "Teléfono inválido"),
  email: z.string().email("Correo inválido"),
  dev: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  preselectDev?: string;
  source?: string;
};

export function LeadForm({ preselectDev, source = "home" }: Props) {
  const [success, setSuccess] = useState<{ name: string; waHref: string } | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { dev: preselectDev ?? "" },
  });

  const onSubmit = async (values: FormValues) => {
    const res = await submitLead({ ...values, source });
    if (!res.ok) {
      const first = Object.keys(res.errors ?? {})[0] as keyof FormValues | undefined;
      if (first) setFocus(first);
      return;
    }
    const devObj = DEVS.find((d) => d.slug === values.dev);
    const waHref = waLink(devObj ? waDevMessage(devObj.name) : WA_DEFAULT_MESSAGE);
    setSuccess({ name: values.name.split(" ")[0] ?? "", waHref });
  };

  if (success) {
    return (
      <div className="form-success">
        <div className="badge">
          <Check />
        </div>
        <h3>¡Gracias {success.name}!</h3>
        <p>
          Tu solicitud fue recibida. Un asesor de EXEN te contactará muy pronto.
        </p>
        <a
          className="btn btn--wa"
          href={success.waHref}
          target="_blank"
          rel="noopener"
        >
          Adelanta por WhatsApp <WhatsAppIcon />
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={`field${errors.name ? " has-error" : ""}`}>
        <label>
          Nombre completo <span className="req">*</span>
        </label>
        <input type="text" placeholder="Tu nombre" autoComplete="name" {...register("name")} />
        <div className="err">{errors.name?.message ?? "Ingresa tu nombre"}</div>
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
        <div className={`field${errors.email ? " has-error" : ""}`}>
          <label>
            Correo <span className="req">*</span>
          </label>
          <input
            type="email"
            placeholder="tu@correo.com"
            autoComplete="email"
            {...register("email")}
          />
          <div className="err">{errors.email?.message ?? "Correo inválido"}</div>
        </div>
      </div>
      <div className="field">
        <label>Desarrollo de interés</label>
        <select {...register("dev")}>
          <option value="">— Selecciona —</option>
          {DEVS.map((d) => (
            <option key={d.slug} value={d.slug}>
              {d.name}
            </option>
          ))}
          <option value="otro">Aún no lo decido</option>
        </select>
      </div>
      <div className="field">
        <label>Mensaje</label>
        <textarea
          placeholder="Cuéntanos qué estás buscando..."
          {...register("message")}
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn--primary btn--block btn--lg"
      >
        {isSubmitting ? "Enviando…" : "Enviar solicitud"}
      </button>
      <p className="form-foot">
        Al enviar aceptas ser contactado por EXEN. No compartimos tus datos.
      </p>
    </form>
  );
}
