import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Placeholder from "@/components/Placeholder";

export const metadata: Metadata = { title: "Estilos" };

const styles = [
  { name: "[Estilo 1]", text: "[Descripción breve de este estilo y qué tipo de diseños encaja.]" },
  { name: "[Estilo 2]", text: "[Descripción breve.]" },
  { name: "[Estilo 3]", text: "[Descripción breve.]" },
];

export default function EstilosPage() {
  return (
    <>
      <PageHeader title="Estilos" intro="Lo que más disfruto tatuando y lo que mejor se me da." />
      <section className="mx-auto max-w-6xl space-y-16 px-6 pb-24">
        {styles.map((s, i) => (
          <article key={s.name} className="grid gap-8 md:grid-cols-2 md:items-center">
            <Placeholder label={s.name} ratio="aspect-[4/3]" className={i % 2 ? "md:order-2" : ""} />
            <div>
              <h2 className="font-display text-4xl">{s.name}</h2>
              <p className="mt-4 text-lg text-muted">{s.text}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}