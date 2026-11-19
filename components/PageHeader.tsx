export default function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-8 pt-16 md:pt-24">
      <h1 className="font-display text-5xl md:text-7xl">{title}</h1>
      {intro && <p className="mt-6 max-w-2xl text-lg text-muted">{intro}</p>}
    </section>
  );
}