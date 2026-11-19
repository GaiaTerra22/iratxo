"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { STATUS_VALUES } from "@/lib/requests";

const schema = z.object({
  id: z.string().uuid(),
  status: z.enum(STATUS_VALUES),
  notes: z.string().max(5000),
  proposed: z.string().regex(/^(\d{4}-\d{2}-\d{2})?$/),
});

export async function updateRequest(formData: FormData) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getClaims();
  if (!auth?.claims) redirect("/login");

  const parsed = schema.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
    notes: String(formData.get("notes") ?? ""),
    proposed: String(formData.get("proposed") ?? ""),
  });
  if (!parsed.success) throw new Error("Datos no válidos");

  const d = parsed.data;
  const { data, error } = await supabase
    .from("requests")
    .update({
      status: d.status,
      internal_notes: d.notes || null,
      proposed_date: d.proposed ? `${d.proposed}T00:00:00Z` : null,
    })
    .eq("id", d.id)
    .select("id");

  if (error || !data || data.length === 0) {
    throw new Error("No se pudo guardar el cambio");
  }

  revalidatePath("/admin");
  redirect(`/admin/${d.id}?saved=1`);
}