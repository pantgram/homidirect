import { FastifyInstance } from "fastify";
import { BookingController } from "./bookings.controller";

export async function bookingRoutes(fastify: FastifyInstance) {
  fastify.get("", BookingController.getAll);
  fastify.get("/:id", BookingController.getById);
  fastify.post("", BookingController.create);
  fastify.patch("/:id", BookingController.update);
  fastify.delete("/:id", BookingController.delete);
}
