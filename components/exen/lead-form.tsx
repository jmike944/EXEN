"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check } from "lucide-react";
import { DEV_OPTIONS } from "@/lib/dev-options";
import { waLink, waDevMessage, WA_DEFAULT_MESSAGE } from "@/lib/company";
import { submitLead } from "@/app/actions/lead";
import { WhatsAppIcon } from "./whatsapp-icon";

const schema = z.object({
  firstName: z.string().min(2, "Ingresa tu nombre"),
  lastName: z.string().min(2, "Ingresa tu apellido"),
  phone: z
    .string()
    .refine((v) => v.replace(/\D/g, "").length >= 8, "Teléfono inválido"),
  email: z.string().email("Correo inválido"),
  dev: z.string().min(1, "Elige un desarrollo"),
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
  const [formError, setFormError] = useState<string | null>(null);

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
    setFormError(null);
    const res = await submitLead({ ...values, source });
    if (!res.ok) {
      if (res.formError) {
        setFormError(res.formError);
        return;
      }
      const first = Object.keys(res.errors ?? {})[0] as keyof FormValues | undefined;
      if (first) setFocus(first);
      return;
    }
    const devObj = DEV_OPTIONS.find((d) => d.slug === values.dev);
    const waHref = waLink(devObj ? waDevMessage(devObj.name) : WA_DEFAULT_MESSAGE);
    setSuccess({ name: values.firstName, waHref });
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
      <div className={`field${errors.dev ? " has-error" : ""}`}>
        <label>
          Desarrollo de interés <span className="req">*</span>
        </label>
        <select {...register("dev")}>
          <option value="">— Selecciona —</option>
          {DEV_OPTIONS.map((d) => (
            <option key={d.slug} value={d.slug}>
              {d.name}
            </option>
          ))}
        </select>
        <div className="err">{errors.dev?.message ?? "Elige un desarrollo"}</div>
      </div>
      <div className="field">
        <label>Mensaje</label>
        <textarea
          placeholder="Cuéntanos qué estás buscando..."
          {...register("message")}
        />
      </div>
      {formError ? (
        <div className="form-error" role="alert">
          {formError}
        </div>
      ) : null}
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
