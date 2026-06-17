import { Pool } from "pg";

// Reaproveita a conexão entre chamadas (boa prática em apps serverless)
const globalForPg = global as unknown as { pgPool?: Pool };

export const pool =
  globalForPg.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes("localhost")
      ? false
      : { rejectUnauthorized: false },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPg.pgPool = pool;
}

// Garante que a tabela de usuários existe (rodado uma vez por instância)
let initialized = false;
export async function ensureSchema() {
  if (initialized) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
  initialized = true;
}
