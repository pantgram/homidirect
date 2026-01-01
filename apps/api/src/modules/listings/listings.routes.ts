import { FastifyInstance } from "fastify";
import { ListingController } from "./listings.controller";
import { requireRole, verifyListingOwnership, verifyListingCreation } from "@/middleware/authorization";
import { validateBody, validateParams, validateQuery } from "@/plugins/validator";
import {
  createListingSchema,
  updateListingSchema,
  listingIdParamSchema,
  searchListingsSchema,
} from "@/schemas/listing.schema";

export async function listingRoutes(fastify: FastifyInstance) {
  // Search listings - public with auth gate for pagination limits
  // Supports: full-text search, multi-filters, geolocation, sort, pagination
  fastify.get("/search", {
    preValidation: [
      validateQuery(searchListingsSchema),
      // Optional auth - try to authenticate but don't fail if not authenticated
      async (request) => {
        try {
          const payload = await request.jwtVerify();
          (request as any).user = {
            id: (payload as any).id,
            email: (payload as any).email,
            role: (payload as any).role,
          };
        } catch {
          // Not authenticated - that's fine for search
        }
      },
    ],
  }, ListingController.search);

  // Get distinct cities for location filter dropdown
  fastify.get("/cities", ListingController.getCities);

  // Get all listings - public (anyone can browse)
  fastify.get("", ListingController.getAll);

  // Get listing by ID - public (anyone can view)
  fastify.get<{ Params: { id: string } }>("/:id", {
    preValidation: [validateParams(listingIdParamSchema)]
  }, ListingController.getById);

  // Create listing - only landlords, and only for themselves
  fastify.post("", {
    preValidation: [
      fastify.authenticate,
      requireRole("LANDLORD"),
      validateBody(createListingSchema),
      verifyListingCreation
    ]
  }, ListingController.create as any);

  // Update listing - only the landlord who owns it
  fastify.patch<{ Params: { id: string } }>("/:id", {
    preValidation: [
      fastify.authenticate,
      requireRole("LANDLORD"),
      validateParams(listingIdParamSchema),
      validateBody(updateListingSchema),
      verifyListingOwnership
    ]
  }, ListingController.update as any);

  // Delete listing - only the landlord who owns it
  fastify.delete<{ Params: { id: string } }>("/:id", {
    preValidation: [
      fastify.authenticate,
      requireRole("LANDLORD"),
      validateParams(listingIdParamSchema),
      verifyListingOwnership
    ]
  }, ListingController.delete as any);
}
