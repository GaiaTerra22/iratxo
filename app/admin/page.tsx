import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { STATUSES, statusLabel } from "@/lib/requests";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("requests")
    .select("id, created_at, name, email, zone, size, status, reference_paths")
    .order("created_at", { ascending: false });

  if (status && STATUSES.some((s) => s.value === status)) {
    query = query.eq("status", status);
  }

  const { data: requests, error } = await query;

  const chip = (active: boolean) =>
    `border px-3 py-1 text-xs uppercase tracking-[0.15em] transition ${
      active ? "border-accent text-accent" : "border-white/15 text-muted hover:text-ink"
    }`;

  return (
    <>
      <h1 className="font-display text-5xl">Solicitudes</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link href="/admin" className={chip(!status)}>Todas</Link>
        {STATUSES.map((s) => (
          <Link key={s.value} href={`/admin?status=${s.value}`} className={chip(status === s.value)}>
            {s.label}
          </Link>
        ))}
      </div>

      {error && (
        <p className="mt-8 border border-accent/50 bg-accent/10 px-4 py-3 text-sm">
          No se pudieron cargar las solicitudes: {error.message}
        </p>
      )}

      {requests && requests.length === 0 && (
        <p className="mt-10 text-muted">No hay solicitudes en esta vista.</p>
      )}

      <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
        {requests?.map((r) => (
          <li key={r.id}>
            <Link
              href={`/admin/${r.id}`}
              className="grid gap-2 py-5 transition hover:bg-surface md:grid-cols-[1fr_1fr_auto] md:items-center md:px-4"
            >
              <div>
                <p className="font-display text-2xl">{r.name}</p>
                <p className="text-sm text-muted">{r.email}</p>
              </div>
              <p className="text-sm text-muted">
                {r.zone} · {r.size}
                {r.reference_paths.length > 0 && ` · ${r.reference_paths.length} foto(s)`}
              </p>
              <div className="flex items-center gap-4 text-xs uppercase tracking-[0.15em]">
                <span className={r.status === "new" ? "text-accent" : "text-muted"}>
                  {statusLabel(r.status)}
                </span>
                <span className="text-muted">
                  {new Date(r.created_at).toLocaleDateString("es-ES", {
                    timeZone: "Europe/Madrid",
                  })}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}