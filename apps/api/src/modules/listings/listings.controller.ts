import { FastifyRequest, FastifyReply } from "fastify";
import { ListingService } from "./listings.service";
import { CreateListingDTO, UpdateListingDTO, SearchListingsParams } from "./listings.types";
import { NotFoundError } from "@/utils/errors";

export const ListingController = {
  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const listings = await ListingService.getAllListings();
    return reply.code(200).send({ listings: listings });
  },

  async getById(
    request: FastifyRequest<{ Params: { listingId: string } }>,
    reply: FastifyReply
  ) {
    const id = parseInt(request.params.listingId);
    const listing = await ListingService.getListingById(id);

    if (!listing) {
      throw new NotFoundError("Listing not found");
    }

    return reply.code(200).send({ listing: listing });
  },

  async create(
    request: FastifyRequest<{ Body: CreateListingDTO & { uploadSessionId?: string } }>,
    reply: FastifyReply
  ) {
    const { uploadSessionId, ...listingData } = request.body;
    const listing = await ListingService.createListing(listingData, uploadSessionId);
    return reply.code(201).send({ listing });
  },

  async update(
    request: FastifyRequest<{ Params: { listingId: string }; Body: UpdateListingDTO }>,
    reply: FastifyReply
  ) {
    const id = parseInt(request.params.listingId);
    const listing = await ListingService.updateListing(id, request.body);

    if (!listing) {
      throw new NotFoundError("Listing not found");
    }

    return reply.code(200).send({ listing: listing });
  },

  async delete(
    request: FastifyRequest<{ Params: { listingId: string } }>,
    reply: FastifyReply
  ) {
    const id = parseInt(request.params.listingId);
    const deleted = await ListingService.deleteListing(id);

    if (!deleted) {
      throw new NotFoundError("Listing not found");
    }

    return reply.code(204).send();
  },

  async search(
    request: FastifyRequest<{ Querystring: SearchListingsParams }>,
    reply: FastifyReply
  ) {
    const params = request.query;
    // Check if user is authenticated (user object exists from optional auth)
    const isAuthenticated = !!(request as any).user?.id;

    const result = await ListingService.searchListings(params, isAuthenticated);
    return reply.code(200).send(result);
  },

  async getCities(request: FastifyRequest, reply: FastifyReply) {
    const cities = await ListingService.getDistinctCities();
    return reply.code(200).send({ cities });
  },

  async getMyListings(
    request: FastifyRequest<{ Querystring: { page?: number; limit?: number } }>,
    reply: FastifyReply
  ) {
    const userId = (request as any).user.id;
    const { page = 1, limit = 15 } = request.query;
    const result = await ListingService.getListingsByLandlordId(userId, page, limit);
    return reply.code(200).send(result);
  },
};
