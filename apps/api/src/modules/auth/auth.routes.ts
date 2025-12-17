import { FastifyInstance } from "fastify";
import { AuthController } from "./auth.controller";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/register", AuthController.register);
  fastify.post("/login", AuthController.login);
  fastify.post("/refresh", AuthController.refresh);
  // Example protected route
  fastify.get(
    "/me",
    { preValidation: [fastify.authenticate] },
    AuthController.me
  );
}
