import { FastifyInstance } from "fastify";
import { authRoutes } from "../auth/auth.routes";
import { userRoutes } from "../users/users.routes";
import { listingRoutes } from "../listings/listings.routes";
import { bookingRoutes } from "../bookings/bookings.routes";
import { tagRoutes } from "../tags/tags.routes";

export async function apiRoutes(fastify: FastifyInstance) {
  // all auth routes will be under /api/auth
  fastify.register(authRoutes, { prefix: "/auth" });

  // all user routes will be under /api/users
  fastify.register(userRoutes, { prefix: "/users" });

  // all listing routes will be under /api/listings
  fastify.register(listingRoutes, { prefix: "/listings" });

  // all booking routes will be under /api/bookings
  fastify.register(bookingRoutes, { prefix: "/bookings" });

  // all tag routes will be under /api/tags
  fastify.register(tagRoutes, { prefix: "/tags" });
}
