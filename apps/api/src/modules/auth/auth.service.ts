import { db } from "config/db";
import { NewUser, users } from "@/modules/users/users.model";
import { eq } from "drizzle-orm";
import { hashPassword, comparePasswords } from "utils/hash";
import { signToken } from "utils/jwt";
import { FastifyInstance } from "fastify";

import { LoginInput, RefreshInput } from "./auth.types";
export const AuthService = {
  async register({ email, password, firstName, lastName, role }: NewUser) {
    const [existing] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (existing) throw new Error("Email already registered");

    const hashed = await hashPassword(password);
    const [user] = await db
      .insert(users)
      .values({
        email,
        password: hashed,
        firstName,
        lastName,
        role,
      })
      .returning();

    const accessToken = signToken(
      { id: user.id, email: user.email, role: user.role },
      "15M"
    );

    const refreshToken = signToken(
      { id: user.id, email: user.email, role: user.role },
      "7D"
    );
    return { accessToken, refreshToken };
  },

  async login({ email, password }: LoginInput) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) throw new Error("Invalid credentials");

    const valid = await comparePasswords(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const accessToken = signToken(
      { id: user.id, email: user.email, role: user.role },
      "15M"
    );
    const refreshToken = signToken(
      { id: user.id, email: user.email, role: user.role },
      "7D"
    );
    return { accessToken, refreshToken };
  },

  async refresh({ token }: RefreshInput, fastify: FastifyInstance) {
    console.log("Refresh token received:", token);
    const payload = fastify.jwt.verify(token);
    console.log("Payload:", payload);
    const newAccessToken = fastify.jwt.sign(
      { id: payload },
      { expiresIn: "15m" }
    );
    const newRefreshToken = fastify.jwt.sign(
      { id: payload },
      { expiresIn: "7D" }
    );
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  },
};
