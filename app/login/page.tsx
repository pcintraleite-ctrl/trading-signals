"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Não foi possível entrar.");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Erro de conexão. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <main className="flex-1 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="font-[var(--font-display)] text-xl tracking-tight block mb-10 text-center"
        >
          Veridex
        </Link>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-7">
          <h1 className="text-lg font-medium mb-1">Entrar</h1>
          <p className="text-sm text-[var(--muted)] mb-6">
            Acesse seu painel de sinais.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs text-[var(--muted)] mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-md px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)] transition-colors"
                placeholder="voce@email.com"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--muted)] mb-1.5">
                Senha
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-md px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)] transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-[var(--sell)] bg-[var(--sell)]/10 rounded-md px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-[var(--accent)] text-[#1a1206] rounded-md py-2.5 font-medium hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>

        <p className="text-sm text-[var(--muted)] text-center mt-6">
          Não tem conta?{" "}
          <Link href="/register" className="text-[var(--accent)]">
            Criar conta
          </Link>
        </p>
      </div>
    </main>
  );
}
