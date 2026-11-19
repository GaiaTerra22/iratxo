import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Cuidados del tatuaje" };

export default function CuidadosPage() {
  return (
    <>
      <PageHeader title="Cuidados" intro="Cómo cuidar tu tatuaje para que cicatrice bien." />
      <section className="mx-auto max-w-3xl space-y-10 px-6 pb-24 text-lg text-muted">
        <div>
          <h2 className="font-display text-3xl text-ink">Primeras horas</h2>
          <p className="mt-3">[Protocolo de Aintzire.]</p>
        </div>
        <div>
          <h2 className="font-display text-3xl text-ink">Primeras semanas</h2>
          <p className="mt-3">[Protocolo de Aintzire.]</p>
        </div>
        <div>
          <h2 className="font-display text-3xl text-ink">Cuándo contactar conmigo</h2>
          <p className="mt-3">[Signos de alerta y cómo avisar.]</p>
        </div>
      </section>
    </>
  );
}