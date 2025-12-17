import { FastifyInstance } from "fastify";
import { authRoutes } from "../auth/auth.routes";
import { userRoutes } from "../users/users.routes";

export async function apiRoutes(fastify: FastifyInstance) {
  // all auth routes will be under /api/auth
  fastify.register(authRoutes, { prefix: "/auth" });

  // all user routes will be under /api/users
  fastify.register(userRoutes, { prefix: "/users" });
}
