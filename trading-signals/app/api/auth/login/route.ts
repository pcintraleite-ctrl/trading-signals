import { NextRequest, NextResponse } from "next/server";
import { pool, ensureSchema } from "@/lib/db";
import { verifyPassword, createSessionToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await ensureSchema();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const result = await pool.query(
      "SELECT id, email, password_hash, is_active FROM users WHERE email = $1",
      [email]
    );

    const user = result.rows[0];
    if (!user) {
      return NextResponse.json(
        { error: "Email ou senha incorretos." },
        { status: 401 }
      );
    }

    if (!user.is_active) {
      return NextResponse.json(
        { error: "Esse usuário não está apto para acessar o sistema." },
        { status: 403 }
      );
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return NextResponse.json(
        { error: "Email ou senha incorretos." },
        { status: 401 }
      );
    }

    const token = createSessionToken({ userId: user.id, email: user.email });

    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro interno ao fazer login." },
      { status: 500 }
    );
  }
}
