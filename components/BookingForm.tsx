"use client";

import { useState } from "react";

const field =
  "w-full border border-white/15 bg-surface px-4 py-3 text-ink outline-none transition focus:border-accent";
const label = "mb-2 block text-xs uppercase tracking-[0.2em] text-muted";

export default function BookingForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: aquí conectaremos con Supabase y los emails.
    setSent(true);
  }

  if (sent) {
    return (
      <p className="border border-white/15 bg-surface p-8 text-lg">
        Formulario de prueba: todavía no se guarda nada. Pronto estará conectado.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">Nombre</label>
          <input id="name" name="name" required className={field} />
        </div>
        <div>
          <label className={label} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className={field} />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="phone">Teléfono (opcional)</label>
        <input id="phone" name="phone" type="tel" className={field} />
      </div>

      <div>
        <label className={label} htmlFor="idea">Cuéntame tu idea</label>
        <textarea id="idea" name="idea" rows={6} required className={field} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className={label} htmlFor="zone">Zona del cuerpo</label>
          <input id="zone" name="zone" required placeholder="Ej: antebrazo" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="size">Tamaño aproximado</label>
          <select id="size" name="size" required className={field} defaultValue="">
            <option value="" disabled>Elige una opción</option>
            <option>Pequeño (hasta 5 cm)</option>
            <option>Mediano (5-15 cm)</option>
            <option>Grande (más de 15 cm)</option>
            <option>No lo sé</option>
          </select>
        </div>
      </div>

      <div>
        <label className={label} htmlFor="refs">Imágenes de referencia</label>
        <input id="refs" name="refs" type="file" accept="image/*" multiple className={field} />
      </div>

      <label className="flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" required className="mt-1" />
        Confirmo que soy mayor de 18 años.
      </label>

      <label className="flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" required className="mt-1" />
        He leído y acepto la política de privacidad.
      </label>

      <button
        type="submit"
        className="bg-accent px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:opacity-90"
      >
        Enviar solicitud
      </button>
    </form>
  );
}