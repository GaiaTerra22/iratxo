import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { STATUSES } from "@/lib/requests";
import { updateRequest } from "@/app/admin/actions";

const field =
  "w-full border border-white/15 bg-surface px-4 py-3 text-ink outline-none transition focus:border-accent";
const label = "mb-2 block text-xs uppercase tracking-[0.2em] text-muted";

export default async function RequestPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const { saved } = await searchParams;
  const supabase = await createClient();

  const { data: r, error } = await supabase
    .from("requests")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !r) notFound();

  let photos: { path: string; url: string }[] = [];
  if (r.reference_paths.length > 0) {
    const { data: signed } = await supabase.storage
      .from("references")
      .createSignedUrls(r.reference_paths, 3600);
    photos =
      signed
        ?.filter((s) => s.signedUrl)
        .map((s) => ({ path: s.path ?? "", url: s.signedUrl })) ?? [];
  }

  return (
    <>
      <Link href="/admin" className="text-xs uppercase tracking-[0.2em] text-muted hover:text-ink">
        ← Volver
      </Link>

      <h1 className="mt-6 font-display text-5xl">{r.name}</h1>
      <p className="mt-2 text-muted">
        <a href={`mailto:${r.email}`} className="hover:text-ink">{r.email}</a>
        {r.phone && <> · {r.phone}</>}
      </p>
      <p className="mt-1 text-sm text-muted">
        Recibida el{" "}
        {new Date(r.created_at).toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}
      </p>

      {saved && (
        <p className="mt-6 border border-white/15 bg-surface px-4 py-3 text-sm">
          Cambios guardados.
        </p>
      )}

      <div className="mt-10 grid gap-12 md:grid-cols-[2fr_1fr]">
        <section className="space-y-8">
          <div>
            <h2 className={label}>Idea</h2>
            <p className="whitespace-pre-wrap text-lg">{r.idea}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className={label}>Zona</h2>
              <p>{r.zone}</p>
            </div>
            <div>
              <h2 className={label}>Tamaño</h2>
              <p>{r.size}</p>
            </div>
          </div>

          <div>
            <h2 className={label}>Referencias</h2>
            {photos.length === 0 ? (
              <p className="text-muted">Sin imágenes.</p>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {photos.map((p) => (
                  <a key={p.path} href={p.url} target="_blank" rel="noopener noreferrer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.url} alt="Referencia" className="aspect-square w-full object-cover" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        <form action={updateRequest} className="space-y-6 self-start border border-white/10 bg-surface p-6">
          <input type="hidden" name="id" value={r.id} />

          <div>
            <label className={label} htmlFor="status">Estado</label>
            <select id="status" name="status" defaultValue={r.status} className={field}>
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={label} htmlFor="proposed">Fecha propuesta</label>
            <input
              id="proposed"
              name="proposed"
              type="date"
              defaultValue={r.proposed_date ? r.proposed_date.slice(0, 10) : ""}
              className={field}
            />
          </div>

          <div>
            <label className={label} htmlFor="notes">Notas internas</label>
            <textarea
              id="notes"
              name="notes"
              rows={6}
              maxLength={5000}
              defaultValue={r.internal_notes ?? ""}
              className={field}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent px-6 py-3 text-xs uppercase tracking-[0.2em] text-white transition hover:opacity-90"
          >
            Guardar
          </button>
        </form>
      </div>
    </>
  );
}