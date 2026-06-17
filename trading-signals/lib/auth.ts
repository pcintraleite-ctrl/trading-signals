import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-troque-em-producao";
const COOKIE_NAME = "session_token";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export type SessionPayload = {
  userId: number;
  email: string;
};

export function createSessionToken(payload: SessionPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionPayload;
  } catch {
    return null;
  }
}

export { COOKIE_NAME };
