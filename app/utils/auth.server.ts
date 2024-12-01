import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || '';
if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is missing in .env file!");
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(userId: number): string {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });
}

export function verifyToken(token: string): JwtPayload | string | null {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
}