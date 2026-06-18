# Veridex Signals

Site com login, autenticado contra um banco de dados, que exibe um painel de
sinais de trading **simulados** (não é uma IA real prevendo o mercado — é uma
demonstração para fins educacionais).

## Como rodar localmente

1. Instale as dependências:
   ```
   npm install
   ```
2. Copie `.env.example` para `.env` e preencha `DATABASE_URL` com um banco
   Postgres (pode ser gratuito, ex. neon.tech) e um `JWT_SECRET` aleatório.
3. Rode o servidor de desenvolvimento:
   ```
   npm run dev
   ```
4. Acesse http://localhost:3000

## Estrutura

- `app/` — páginas (home, login, cadastro, dashboard) e rotas de API
- `lib/db.ts` — conexão com o Postgres e criação automática da tabela `users`
- `lib/auth.ts` — hash de senha e geração/verificação do token de sessão
- `lib/signals.ts` — gerador dos sinais simulados
- `proxy.ts` — protege a rota `/dashboard`, redirecionando quem não está logado

## Aviso

Os sinais são gerados de forma simulada e não constituem recomendação de
investimento real.
