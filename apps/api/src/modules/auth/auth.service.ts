import { db } from "config/db";
import { NewUser, users } from "@/modules/users/users.model";
import { eq } from "drizzle-orm";
import { hashPassword, comparePasswords } from "utils/hash";
import { FastifyInstance } from "fastify";

import { LoginInput, RefreshInput } from "./auth.types";
export const AuthService = {
  async register(
    { email, password, firstName, lastName, role }: NewUser,
    fastify: FastifyInstance
  ) {
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

    const accessToken = fastify.jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      { expiresIn: "15m" }
    );
    const refreshToken = fastify.jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      { expiresIn: "7d" }
    );
    return { accessToken, refreshToken };
  },

  async login({ email, password }: LoginInput, fastify: FastifyInstance) {
    const [user] = await db
      .select({
        email: users.email,
        id: users.id,
        role: users.role,
        password: users.password,
      })
      .from(users)
      .where(eq(users.email, email));
    if (!user) throw new Error("Invalid credentials");

    const valid = await comparePasswords(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const accessToken = fastify.jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      { expiresIn: "15m" }
    );
    const refreshToken = fastify.jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      { expiresIn: "7d" }
    );
    return { accessToken, refreshToken };
  },

  async refresh({ refreshToken }: RefreshInput, fastify: FastifyInstance) {
    const payload = fastify.jwt.verify(refreshToken) as any;
    const newAccessToken = fastify.jwt.sign(
      { id: payload.id, email: payload.email, role: payload.role },
      { expiresIn: "15m" }
    );
    const newRefreshToken = fastify.jwt.sign(
      { id: payload.id, email: payload.email, role: payload.role },
      { expiresIn: "7d" }
    );
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  },
};
