import { FastifyInstance } from "fastify";
import { ListingController } from "./listings.controller";
import { requireRole, verifyListingOwnership, verifyListingCreation } from "@/middleware/authorization";

export async function listingRoutes(fastify: FastifyInstance) {
  // Get all listings - public (anyone can browse)
  fastify.get("", ListingController.getAll);

  // Get listing by ID - public (anyone can view)
  fastify.get("/:id", ListingController.getById);

  // Create listing - only landlords, and only for themselves
  fastify.post("", {
    preValidation: [fastify.authenticate, requireRole("LANDLORD"), verifyListingCreation]
  }, ListingController.create as any);

  // Update listing - only the landlord who owns it
  fastify.patch<{ Params: { id: string } }>("/:id", {
    preValidation: [fastify.authenticate, requireRole("LANDLORD"), verifyListingOwnership]
  }, ListingController.update as any);

  // Delete listing - only the landlord who owns it
  fastify.delete<{ Params: { id: string } }>("/:id", {
    preValidation: [fastify.authenticate, requireRole("LANDLORD"), verifyListingOwnership]
  }, ListingController.delete as any);
}
