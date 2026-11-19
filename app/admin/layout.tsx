import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/login/actions";

export const metadata: Metadata = {
  title: "Panel",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) redirect("/login");

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <nav className="mb-10 flex items-center justify-between border-b border-white/10 pb-4 text-xs uppercase tracking-[0.2em]">
        <Link href="/admin" className="text-accent">Solicitudes</Link>
        <form action={logout}>
          <button type="submit" className="text-muted hover:text-ink">
            Cerrar sesión
          </button>
        </form>
      </nav>
      {children}
    </div>
  );
}