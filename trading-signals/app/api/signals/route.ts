import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, COOKIE_NAME } from "@/lib/auth";
import { generateMockSignals } from "@/lib/signals";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const session = token ? verifySessionToken(token) : null;

  if (!session) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const signals = generateMockSignals(6);
  return NextResponse.json({ signals });
}
