"use server";

import { z } from "zod";
import { createPublicClient } from "@/lib/supabase/public";
import { sendRequestEmails } from "@/lib/email";

const pathRegex =
  /^[0-9a-f-]{36}\/[0-9a-f-]{36}\.(jpg|png|webp)$/;

const schema = z
  .object({
    id: z.string().uuid(),
    name: z.string().trim().min(1).max(120),
    email: z.string().trim().email().max(200),
    phone: z.string().trim().max(40),
    idea: z.string().trim().min(10).max(5000),
    zone: z.string().trim().min(1).max(120),
    size: z.string().trim().min(1).max(60),
    adult: z.literal(true),
    privacy: z.literal(true),
    website: z.string(), // campo trampa antispam
    paths: z.array(z.string().regex(pathRegex)).max(5),
  })
  .refine((d) => d.paths.every((p) => p.startsWith(`${d.id}/`)));

export async function submitRequest(
  input: unknown
): Promise<{ ok: boolean; error?: string }> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Revisa los campos del formulario." };
  }
  const d = parsed.data;

  // Si el campo trampa tiene contenido, es un bot: fingimos éxito
  if (d.website) return { ok: true };

  const supabase = createPublicClient();
  const { error } = await supabase.from("requests").insert({
    id: d.id,
    name: d.name,
    email: d.email,
    phone: d.phone || null,
    idea: d.idea,
    zone: d.zone,
    size: d.size,
    reference_paths: d.paths,
  });

  if (error) {
    console.error("Error guardando solicitud:", error.message);
    return { ok: false, error: "No se pudo enviar la solicitud. Inténtalo de nuevo." };
  }

  try {
    await sendRequestEmails({
      id: d.id,
      name: d.name,
      email: d.email,
      phone: d.phone,
      idea: d.idea,
      zone: d.zone,
      size: d.size,
      photoCount: d.paths.length,
    });
  } catch (e) {
    console.error("Error enviando emails:", e);
  }

  return { ok: true };
}