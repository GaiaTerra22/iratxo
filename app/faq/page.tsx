import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Preguntas frecuentes" };

const faqs = [
  { q: "¿Cómo pido cita?", a: "[Respuesta. Ej: rellenando el formulario de solicitud.]" },
  { q: "¿Cuánto cuesta un tatuaje?", a: "[Respuesta.]" },
  { q: "¿Pides señal?", a: "[Respuesta.]" },
  { q: "¿Puedo ir acompañado?", a: "[Respuesta.]" },
  { q: "¿Qué pasa si tengo que cancelar?", a: "[Respuesta.]" },
];

export default function FaqPage() {
  return (
    <>
      <PageHeader title="Preguntas frecuentes" />
      <section className="mx-auto max-w-3xl divide-y divide-white/10 px-6 pb-24">
        {faqs.map((f) => (
          <details key={f.q} className="group py-6">
            <summary className="cursor-pointer list-none font-display text-2xl">{f.q}</summary>
            <p className="mt-4 text-lg text-muted">{f.a}</p>
          </details>
        ))}
      </section>
    </>
  );
}