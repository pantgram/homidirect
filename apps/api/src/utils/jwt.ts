import jwt from "jsonwebtoken";
import type { StringValue } from "ms";

// Ensure JWT_SECRET is set - fail fast if not configured
if (!process.env.JWT_SECRET) {
  throw new Error(
    "FATAL ERROR: JWT_SECRET environment variable is not set. " +
    "Please set JWT_SECRET in your .env file before starting the server."
  );
}

const JWT_SECRET = process.env.JWT_SECRET;

export function signToken(
  payload: Record<string, any>,
  expiresIn: StringValue
) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
