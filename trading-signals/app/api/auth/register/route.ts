import { NextRequest, NextResponse } from "next/server";
import { pool, ensureSchema } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await ensureSchema();
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "A senha precisa ter pelo menos 6 caracteres." },
        { status: 400 }
      );
    }

    const existing = await pool.query("SELECT id FROM users WHERE email = $1", [
      email,
    ]);
    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: "Esse email já está cadastrado." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    await pool.query(
      "INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3)",
      [email, passwordHash, name || null]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro interno ao cadastrar." },
      { status: 500 }
    );
  }
}
