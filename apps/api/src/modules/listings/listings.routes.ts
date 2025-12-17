import { FastifyInstance } from "fastify";
import { ListingController } from "./listings.controller";

export async function listingRoutes(fastify: FastifyInstance) {
  fastify.get("", ListingController.getAll);
  fastify.get("/:id", ListingController.getById);
  fastify.post("", ListingController.create);
  fastify.patch("/:id", ListingController.update);
  fastify.delete("/:id", ListingController.delete);
}
