"use client";

import { useActionState } from "react";
import { login } from "@/app/login/actions";

const field =
  "w-full border border-white/15 bg-surface px-4 py-3 text-ink outline-none transition focus:border-accent";
const label = "mb-2 block text-xs uppercase tracking-[0.2em] text-muted";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label className={label} htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div>
        <label className={label} htmlFor="password">Contraseña</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className={field} />
      </div>

      {state?.error && (
        <p role="alert" className="border border-accent/50 bg-accent/10 px-4 py-3 text-sm">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="bg-accent px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}