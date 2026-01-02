import { FastifyInstance } from "fastify";
import { authRoutes } from "../auth/auth.routes";
import { userRoutes } from "../users/users.routes";
import { listingRoutes } from "../listings/listings.routes";
import {
  listingImageRoutes,
  pendingImageRoutes,
} from "../listingImages/listingImages.routes";
import { bookingRoutes } from "../bookings/bookings.routes";
import { tagRoutes } from "../tags/tags.routes";
import {
  verificationDocumentRoutes,
  adminVerificationRoutes,
} from "../verificationDocuments/verificationDocuments.routes";
import { favoritesRoutes } from "../favorites/favorites.routes";

export async function apiRoutes(fastify: FastifyInstance) {
  // all auth routes will be under /api/auth
  fastify.register(authRoutes, { prefix: "/auth" });

  // all user routes will be under /api/users
  fastify.register(userRoutes, { prefix: "/users" });

  // all listing routes will be under /api/listings
  fastify.register(listingRoutes, { prefix: "/listings" });

  // listing image routes under /api/listings/:listingId/images
  fastify.register(listingImageRoutes, { prefix: "/listings" });

  // verification document routes under /api/listings/:listingId/verification
  fastify.register(verificationDocumentRoutes, { prefix: "/listings" });

  // pending image upload routes under /api/uploads/:sessionId
  fastify.register(pendingImageRoutes, { prefix: "/uploads" });

  // all booking routes will be under /api/bookings
  fastify.register(bookingRoutes, { prefix: "/bookings" });

  // all tag routes will be under /api/tags
  fastify.register(tagRoutes, { prefix: "/tags" });

  // admin verification routes under /api/admin/verifications
  fastify.register(adminVerificationRoutes, { prefix: "/admin/verifications" });

  // favorites routes under /api/favorites
}
