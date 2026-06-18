import Link from "next/link";

export default function Home() {
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
        <nav className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors px-3 py-2"
          >
            Entrar
          </Link>
          <Link
            href="/register"
            className="text-sm bg-[var(--accent)] text-[#1a1206] px-4 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
          >
            Criar conta
          </Link>
        </nav>
      </header>

      <section className="flex-1 flex items-center px-6 py-20">
        <div className="max-w-3xl mx-auto w-full">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)] mb-6">
            Painel de sinais — ambiente de simulação
          </p>
          <h1 className="font-[var(--font-display)] text-5xl sm:text-6xl leading-[1.05] mb-6">
            Sinais de mercado,
            <br />
            lidos como um terminal.
          </h1>
          <p className="text-[var(--muted)] text-lg max-w-xl mb-10 leading-relaxed">
            Acompanhe um fluxo simulado de sinais de compra e venda para ações
            e criptoativos. Pensado para estudo de interface e lógica de
            decisão — não é uma recomendação de investimento real.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/register"
              className="bg-[var(--accent)] text-[#1a1206] px-6 py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
            >
              Começar agora
            </Link>
            <Link
              href="/login"
              className="text-[var(--foreground)] px-6 py-3 rounded-md border border-[var(--border)] hover:border-[var(--muted)] transition-colors"
            >
              Já tenho conta
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] px-6 py-4">
        <p className="text-xs text-[var(--muted)] text-center">
          Conteúdo simulado, apenas para fins educacionais. Não constitui
          recomendação de investimento.
        </p>
      </footer>
    </main>
  );
}
