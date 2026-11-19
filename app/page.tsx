import Link from "next/link";
import Placeholder from "@/components/Placeholder";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">{site.role}</p>
          <h1 className="mt-4 font-display text-6xl leading-none md:text-8xl">{site.name}</h1>
          <p className="mt-6 max-w-md text-lg text-muted">
            [Frase corta de presentación. Ej: Tatuajes personalizados creados desde cero para ti.]
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/reservar" className="bg-accent px-6 py-3 text-xs uppercase tracking-[0.2em] text-white transition hover:opacity-90">
              Solicitar cita
            </Link>
            <Link href="/portfolio" className="border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.2em] transition hover:border-white/50">
              Ver portfolio
            </Link>
          </div>
        </div>
        <Placeholder label="Foto principal" ratio="aspect-[4/5]" />
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1fr_2fr] md:py-24">
          <Placeholder label="Foto de Aintzire" ratio="aspect-square" />
          <div>
            <h2 className="font-display text-4xl md:text-5xl">Sobre mí</h2>
            <div className="mt-6 space-y-4 text-lg text-muted">
              <p>
                [Texto provisional, reescríbelo en primera persona.] Soy Aintzire. Estudié en ID Arte
                (Vitoria-Gasteiz), hice un máster online de diseño 3D (Bilbao) y me formé en tatuaje
                en el estudio de Cian, en Vitoria-Gasteiz.
              </p>
              <p>
                Llevo 3 años tatuando. [Estilos que hace, qué le inspira, cómo trabaja con cada cliente.]
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <h2 className="font-display text-4xl md:text-5xl">Trabajos recientes</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <Placeholder key={n} label={`Tatuaje ${n}`} />
            ))}
          </div>
          <Link href="/portfolio" className="mt-10 inline-block text-xs uppercase tracking-[0.2em] text-accent hover:underline">
            Ver todo el portfolio →
          </Link>
        </div>
      </section>
    </>
  );
}