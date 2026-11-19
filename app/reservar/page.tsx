import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = { title: "Solicitar cita" };

export default function ReservarPage() {
  return (
    <>
      <PageHeader
        title="Solicitar cita"
        intro="Cuéntame tu idea y te responderé con una propuesta y fechas disponibles."
      />
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <BookingForm />
      </section>
    </>
  );
}