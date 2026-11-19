import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Preparación de la cita" };

export default function PreparacionPage() {
  return (
    <>
      <PageHeader title="Preparación" intro="Qué hacer antes de tu cita." />
      <section className="mx-auto max-w-3xl space-y-10 px-6 pb-24 text-lg text-muted">
        <div>
          <h2 className="font-display text-3xl text-ink">Los días previos</h2>
          <p className="mt-3">[Texto de Aintzire.]</p>
        </div>
        <div>
          <h2 className="font-display text-3xl text-ink">El día de la cita</h2>
          <p className="mt-3">[Texto de Aintzire.]</p>
        </div>
      </section>
    </>
  );
}