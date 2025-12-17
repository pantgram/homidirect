import { FastifyRequest, FastifyReply } from "fastify";
import { ListingService } from "./listings.service";
import { CreateListingDTO, UpdateListingDTO } from "./listings.types";

export const ListingController = {
  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const listings = await ListingService.getAllListings();
      return reply.code(200).send({ data: listings });
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
      const listing = await ListingService.getListingById(id);

      if (!listing) {
        return reply.code(404).send({ error: "Listing not found" });
      }

      return reply.code(200).send({ data: listing });
    } catch (error) {
      return reply.code(500).send({ error: "Internal server error" });
    }
  },

  async create(
    request: FastifyRequest<{ Body: CreateListingDTO }>,
    reply: FastifyReply
  ) {
    try {
      const listing = await ListingService.createListing(request.body);
      return reply.code(201).send({ data: listing });
    } catch (error) {
      return reply.code(500).send({ error: "Internal server error" });
    }
  },

  async update(
    request: FastifyRequest<{ Params: { id: string }; Body: UpdateListingDTO }>,
    reply: FastifyReply
  ) {
    try {
      const id = parseInt(request.params.id);
      const listing = await ListingService.updateListing(id, request.body);

      if (!listing) {
        return reply.code(404).send({ error: "Listing not found" });
      }

      return reply.code(200).send({ data: listing });
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
      const deleted = await ListingService.deleteListing(id);

      if (!deleted) {
        return reply.code(404).send({ error: "Listing not found" });
      }

      return reply.code(204).send();
    } catch (error) {
      return reply.code(500).send({ error: "Internal server error" });
    }
  },
};
