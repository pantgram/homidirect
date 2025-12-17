import jwt from "jsonwebtoken";
import type { StringValue } from "ms";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export function signToken(
  payload: Record<string, any>,
  expiresIn: StringValue
) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: expiresIn });
}
export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
