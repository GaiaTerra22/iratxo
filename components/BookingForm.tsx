"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { submitRequest } from "@/app/reservar/actions";

const MAX_FILES = 5;
const MAX_MB = 5;
const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const field =
  "w-full border border-white/15 bg-surface px-4 py-3 text-ink outline-none transition focus:border-accent";
const label = "mb-2 block text-xs uppercase tracking-[0.2em] text-muted";

export default function BookingForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const data = new FormData(e.currentTarget);
    const files = (data.getAll("refs") as File[]).filter((f) => f.size > 0);

    if (files.length > MAX_FILES) {
      setError(`Máximo ${MAX_FILES} imágenes.`);
      return;
    }
    for (const f of files) {
      if (!EXT[f.type]) {
        setError("Solo se admiten imágenes JPG, PNG o WebP.");
        return;
      }
      if (f.size > MAX_MB * 1024 * 1024) {
        setError(`Cada imagen debe pesar menos de ${MAX_MB} MB.`);
        return;
      }
    }

    setStatus("sending");

    const id = crypto.randomUUID();
    const supabase = createClient();
    const paths: string[] = [];

    for (const file of files) {
      const path = `${id}/${crypto.randomUUID()}.${EXT[file.type]}`;
      const { error: upErr } = await supabase.storage
        .from("references")
        .upload(path, file, { contentType: file.type });
      if (upErr) {
        setStatus("idle");
        setError("No se pudo subir una de las imágenes. Inténtalo de nuevo.");
        return;
      }
      paths.push(path);
    }

    const result = await submitRequest({
      id,
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      idea: String(data.get("idea") ?? ""),
      zone: String(data.get("zone") ?? ""),
      size: String(data.get("size") ?? ""),
      adult: data.get("adult") === "on",
      privacy: data.get("privacy") === "on",
      website: String(data.get("website") ?? ""),
      paths,
    });

    if (!result.ok) {
      setStatus("idle");
      setError(result.error ?? "Ha ocurrido un error.");
      return;
    }
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="border border-white/15 bg-surface p-8">
        <h2 className="font-display text-3xl">¡Solicitud enviada!</h2>
        <p className="mt-3 text-lg text-muted">
          Gracias por contarme tu idea. Revisaré tu solicitud y te responderé por email lo antes posible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Campo trampa antispam: invisible para personas */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px]"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">Nombre</label>
          <input id="name" name="name" required maxLength={120} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required maxLength={200} className={field} />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="phone">Teléfono (opcional)</label>
        <input id="phone" name="phone" type="tel" maxLength={40} className={field} />
      </div>

      <div>
        <label className={label} htmlFor="idea">Cuéntame tu idea</label>
        <textarea id="idea" name="idea" rows={6} required minLength={10} maxLength={5000} className={field} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className={label} htmlFor="zone">Zona del cuerpo</label>
          <input id="zone" name="zone" required maxLength={120} placeholder="Ej: antebrazo" className={field} />
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
        <label className={label} htmlFor="refs">
          Imágenes de referencia (máx. {MAX_FILES}, {MAX_MB} MB cada una)
        </label>
        <input
          id="refs"
          name="refs"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className={field}
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" name="adult" required className="mt-1" />
        Confirmo que soy mayor de 18 años.
      </label>

      <label className="flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" name="privacy" required className="mt-1" />
        He leído y acepto la política de privacidad.
      </label>

      {error && (
        <p role="alert" className="border border-accent/50 bg-accent/10 px-4 py-3 text-sm">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-accent px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {status === "sending" ? "Enviando..." : "Enviar solicitud"}
      </button>
    </form>
  );
}