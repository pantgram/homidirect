import { FastifyInstance } from "fastify";
import { UserController } from "./users.controller";

export async function userRoutes(fastify: FastifyInstance) {
  // Route to fetch all users
  fastify.get("", UserController.getAll);
  fastify.get("/:id", UserController.getById);
  fastify.post("", UserController.create);
  fastify.patch("/:id", UserController.update);
  fastify.delete("/:id", UserController.delete);
}
