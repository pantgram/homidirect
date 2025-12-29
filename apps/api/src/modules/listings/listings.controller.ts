import { FastifyRequest, FastifyReply } from "fastify";
import { ListingService } from "./listings.service";
import { CreateListingDTO, UpdateListingDTO } from "./listings.types";
import { NotFoundError } from "@/utils/errors";

export const ListingController = {
  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const listings = await ListingService.getAllListings();
    return reply.code(200).send({ data: listings });
  },

  async getById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const id = parseInt(request.params.id);
    const listing = await ListingService.getListingById(id);

    if (!listing) {
      throw new NotFoundError("Listing not found");
    }

    return reply.code(200).send({ data: listing });
  },

  async create(
    request: FastifyRequest<{ Body: CreateListingDTO }>,
    reply: FastifyReply
  ) {
    const listing = await ListingService.createListing(request.body);
    return reply.code(201).send({ data: listing });
  },

  async update(
    request: FastifyRequest<{ Params: { id: string }; Body: UpdateListingDTO }>,
    reply: FastifyReply
  ) {
    const id = parseInt(request.params.id);
    const listing = await ListingService.updateListing(id, request.body);

    if (!listing) {
      throw new NotFoundError("Listing not found");
    }

    return reply.code(200).send({ data: listing });
  },

  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const id = parseInt(request.params.id);
    const deleted = await ListingService.deleteListing(id);

    if (!deleted) {
      throw new NotFoundError("Listing not found");
    }

    return reply.code(204).send();
  },
};
