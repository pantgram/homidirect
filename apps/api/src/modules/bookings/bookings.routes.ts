import { FastifyInstance } from "fastify";
import { BookingController } from "./bookings.controller";
import { verifyBookingOwnership } from "@/middleware/authorization";

export async function bookingRoutes(fastify: FastifyInstance) {
  // Get all bookings - authenticated users only (could be filtered by user in controller)
  fastify.get("", {
    preValidation: [fastify.authenticate]
  }, BookingController.getAll as any);

  // Get booking by ID - only if user is involved (tenant or landlord)
  fastify.get<{ Params: { id: string } }>("/:id", {
    preValidation: [fastify.authenticate, verifyBookingOwnership]
  }, BookingController.getById as any);

  // Create booking - authenticated users only
  fastify.post("", {
    preValidation: [fastify.authenticate]
  }, BookingController.create as any);

  // Update booking - only if user is involved (tenant or landlord)
  fastify.patch<{ Params: { id: string } }>("/:id", {
    preValidation: [fastify.authenticate, verifyBookingOwnership]
  }, BookingController.update as any);

  // Delete booking - only if user is involved (tenant or landlord)
  fastify.delete<{ Params: { id: string } }>("/:id", {
    preValidation: [fastify.authenticate, verifyBookingOwnership]
  }, BookingController.delete as any);
}
