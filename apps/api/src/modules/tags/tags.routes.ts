import { FastifyInstance } from "fastify";
import { TagController } from "./tags.controller";

export async function tagRoutes(fastify: FastifyInstance) {
  fastify.get("", TagController.getAll);
  fastify.get("/:id", TagController.getById);
  fastify.post("", TagController.create);
  fastify.patch("/:id", TagController.update);
  fastify.delete("/:id", TagController.delete);
}
