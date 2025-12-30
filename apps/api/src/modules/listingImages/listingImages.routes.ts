import { FastifyInstance } from "fastify";
import { ListingImageController } from "./listingImages.controller";
import { requireRole, verifyListingOwnership } from "@/middleware/authorization";
import { validateParams } from "@/plugins/validator";
import {
  listingImageParamsSchema,
  deleteImageParamsSchema,
} from "@/schemas/listingImage.schema";

export async function listingImageRoutes(fastify: FastifyInstance) {
  // Get all images for a listing - public
  fastify.get<{ Params: { listingId: string } }>("/:listingId/images", {
    preValidation: [validateParams(listingImageParamsSchema)],
  }, ListingImageController.getByListingId);

  // Upload image to a listing - landlord only, must own the listing
  fastify.post<{ Params: { listingId: string } }>("/:listingId/images", {
    preValidation: [
      fastify.authenticate,
      requireRole("LANDLORD"),
      validateParams(listingImageParamsSchema),
      verifyListingOwnership,
    ],
  }, ListingImageController.upload as any);

  // Delete image from a listing - landlord only, must own the listing
  fastify.delete<{ Params: { listingId: string; imageId: string } }>("/:listingId/images/:imageId", {
    preValidation: [
      fastify.authenticate,
      requireRole("LANDLORD"),
      validateParams(deleteImageParamsSchema),
      verifyListingOwnership,
    ],
  }, ListingImageController.delete as any);
}
