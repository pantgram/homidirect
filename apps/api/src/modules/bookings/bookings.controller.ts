import { FastifyRequest, FastifyReply } from "fastify";
import { BookingService } from "./bookings.service";
import { CreateBookingDTO, UpdateBookingDTO } from "./bookings.types";

export const BookingController = {
  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const bookings = await BookingService.getAllBookings();
      return reply.code(200).send({ data: bookings });
    } catch (error) {
      return reply.code(500).send({ error: "Internal server error" });
    }
  },

  async getById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const id = parseInt(request.params.id);
      const booking = await BookingService.getBookingById(id);

      if (!booking) {
        return reply.code(404).send({ error: "Booking not found" });
      }

      return reply.code(200).send({ data: booking });
    } catch (error) {
      return reply.code(500).send({ error: "Internal server error" });
    }
  },

  async create(
    request: FastifyRequest<{ Body: CreateBookingDTO }>,
    reply: FastifyReply
  ) {
    try {
      const booking = await BookingService.createBooking(request.body);
      return reply.code(201).send({ data: booking });
    } catch (error) {
      return reply.code(500).send({ error: "Internal server error" });
    }
  },

  async update(
    request: FastifyRequest<{ Params: { id: string }; Body: UpdateBookingDTO }>,
    reply: FastifyReply
  ) {
    try {
      const id = parseInt(request.params.id);
      const booking = await BookingService.updateBooking(id, request.body);

      if (!booking) {
        return reply.code(404).send({ error: "Booking not found" });
      }

      return reply.code(200).send({ data: booking });
    } catch (error) {
      return reply.code(500).send({ error: "Internal server error" });
    }
  },

  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const id = parseInt(request.params.id);
      const deleted = await BookingService.deleteBooking(id);

      if (!deleted) {
        return reply.code(404).send({ error: "Booking not found" });
      }

      return reply.code(204).send();
    } catch (error) {
      return reply.code(500).send({ error: "Internal server error" });
    }
  },
};
