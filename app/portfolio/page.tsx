import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Placeholder from "@/components/Placeholder";

export const metadata: Metadata = { title: "Portfolio" };

export default function PortfolioPage() {
  return (
    <>
      <PageHeader title="Portfolio" intro="Una selección de mis trabajos más recientes." />
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {Array.from({ length: 9 }, (_, i) => (
            <Placeholder key={i} label={`Tatuaje ${i + 1}`} />
          ))}
        </div>
      </section>
    </>
  );
}