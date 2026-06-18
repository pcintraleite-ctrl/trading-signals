"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type Signal = {
  symbol: string;
  type: "COMPRA" | "VENDA" | "MANTER";
  confidence: number;
  price: number;
  reason: string;
  timestamp: string;
};

const TYPE_STYLES: Record<Signal["type"], string> = {
  COMPRA: "text-[var(--buy)] bg-[var(--buy)]/10 border-[var(--buy)]/30",
  VENDA: "text-[var(--sell)] bg-[var(--sell)]/10 border-[var(--sell)]/30",
  MANTER: "text-[var(--hold)] bg-[var(--hold)]/10 border-[var(--hold)]/30",
};

export default function DashboardPage() {
  const router = useRouter();
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchSignals = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/signals");
    if (res.status === 401) {
      router.push("/login");
      return;
    }
    const data = await res.json();
    setSignals(data.signals || []);
    setLastUpdated(new Date().toLocaleTimeString("pt-BR"));
    setLoading(false);
  }, [router]);

  useEffect(() => {
    fetchSignals();
  }, [fetchSignals]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  return (
    <main className="flex-1 flex flex-col">
      <header className="border-b border-[var(--border)] px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-[var(--font-display)] text-xl tracking-tight">
            Veridex
          </span>
          <span className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest">
            Signals
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors px-3 py-2"
        >
          Sair
        </button>
      </header>

      <section className="px-6 py-8 max-w-4xl mx-auto w-full flex-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-[var(--font-display)] text-2xl mb-1">
              Painel de sinais
            </h1>
            <p className="text-sm text-[var(--muted)]">
              {lastUpdated
                ? `Atualizado às ${lastUpdated}`
                : "Carregando sinais..."}
            </p>
          </div>
          <button
            onClick={fetchSignals}
            disabled={loading}
            className="text-sm bg-[var(--surface-2)] border border-[var(--border)] px-4 py-2 rounded-md hover:border-[var(--muted)] transition-colors disabled:opacity-50"
          >
            {loading ? "Atualizando..." : "Gerar novos sinais"}
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {loading && signals.length === 0 && (
            <div className="text-sm text-[var(--muted)] py-12 text-center">
              Gerando sinais...
            </div>
          )}

          {signals.map((signal) => (
            <div
              key={`${signal.symbol}-${signal.timestamp}`}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-lg px-5 py-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="font-mono text-base font-medium w-20 shrink-0">
                  {signal.symbol}
                </span>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full border shrink-0 ${TYPE_STYLES[signal.type]}`}
                >
                  {signal.type}
                </span>
                <span className="text-sm text-[var(--muted)] truncate hidden sm:block">
                  {signal.reason}
                </span>
              </div>

              <div className="flex items-center gap-5 shrink-0">
                <div className="text-right">
                  <p className="font-mono text-sm">
                    {signal.price.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                  <p className="text-xs text-[var(--muted)]">
                    confiança {signal.confidence}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-[var(--border)] px-6 py-4">
        <p className="text-xs text-[var(--muted)] text-center">
          Sinais gerados por simulação, apenas para fins educacionais. Não
          constitui recomendação de investimento.
        </p>
      </footer>
    </main>
  );
}
