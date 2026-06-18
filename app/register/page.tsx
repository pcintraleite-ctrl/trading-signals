"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Não foi possível criar a conta.");
        setLoading(false);
        return;
      }

      router.push("/login");
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
          <h1 className="text-lg font-medium mb-1">Criar conta</h1>
          <p className="text-sm text-[var(--muted)] mb-6">
            Leva menos de um minuto.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs text-[var(--muted)] mb-1.5">
                Nome
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-md px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)] transition-colors"
                placeholder="Seu nome"
              />
            </div>
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
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-md px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)] transition-colors"
                placeholder="mínimo 6 caracteres"
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
              {loading ? "Criando..." : "Criar conta"}
            </button>
          </form>
        </div>

        <p className="text-sm text-[var(--muted)] text-center mt-6">
          Já tem conta?{" "}
          <Link href="/login" className="text-[var(--accent)]">
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}
