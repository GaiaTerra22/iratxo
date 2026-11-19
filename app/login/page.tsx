import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Acceso",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <>
      <PageHeader title="Acceso" />
      <section className="mx-auto max-w-md px-6 pb-24">
        <LoginForm />
      </section>
    </>
  );
}