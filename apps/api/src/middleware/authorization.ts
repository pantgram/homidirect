import { FastifyRequest, FastifyReply } from "fastify";
import { db } from "config/db";
import { listings } from "@/modules/listings/listings.model";
import { bookings } from "@/modules/bookings/bookings.model";
import { eq } from "drizzle-orm";

export interface AuthenticatedRequest extends FastifyRequest {
  user: {
    id: number;
    email: string;
    role: "LANDLORD" | "TENANT";
  };
}

/**
 * Middleware to check if user has required role(s)
 */
export function requireRole(...roles: ("LANDLORD" | "TENANT")[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = (request as AuthenticatedRequest).user;

    if (!user) {
      return reply.code(401).send({ error: "Unauthorized" });
    }

    if (!roles.includes(user.role)) {
      return reply.code(403).send({
        error: "Forbidden",
        message: `This action requires one of the following roles: ${roles.join(
          ", "
        )}`,
      });
    }
  };
}

/**
 * Middleware to verify user owns the resource (based on userId param)
 */
export async function verifyUserOwnership(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const user = (request as AuthenticatedRequest).user;
  const params = request.params as { id: string };
  const userId = parseInt(params.id);

  if (!user) {
    return reply.code(401).send({ error: "Unauthorized" });
  }

  if (user.id !== userId) {
    return reply.code(403).send({
      error: "Forbidden",
      message: "You can only access your own data",
    });
  }
}

/**
 * Middleware to verify user owns the listing
 */
export async function verifyListingOwnership(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const user = (request as AuthenticatedRequest).user;
  const params = request.params as { id: string };
  const listingId = parseInt(params.id);

  if (!user) {
    return reply.code(401).send({ error: "Unauthorized" });
  }

  // Check if listing exists and get landlordId
  const [listing] = await db
    .select({ landlordId: listings.landlordId })
    .from(listings)
    .where(eq(listings.id, listingId))
    .limit(1);

  if (!listing) {
    return reply.code(404).send({ error: "Listing not found" });
  }

  if (listing.landlordId !== user.id) {
    return reply.code(403).send({
      error: "Forbidden",
      message: "You can only modify your own listings",
    });
  }
}

/**
 * Middleware to verify user is involved in the booking (either as tenant or landlord)
 */
export async function verifyBookingOwnership(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const user = (request as AuthenticatedRequest).user;
  const params = request.params as { id: string };
  const bookingId = parseInt(params.id);

  if (!user) {
    return reply.code(401).send({ error: "Unauthorized" });
  }

  // Check if booking exists and get tenant and landlord ids
  const [booking] = await db
    .select({
      tenantId: bookings.candidateId,
      landlordId: bookings.landlordId,
    })
    .from(bookings)
    .where(eq(bookings.id, bookingId))
    .limit(1);

  if (!booking) {
    return reply.code(404).send({ error: "Booking not found" });
  }

  // User must be either the tenant or the landlord
  if (booking.tenantId !== user.id && booking.landlordId !== user.id) {
    return reply.code(403).send({
      error: "Forbidden",
      message: "You can only access bookings you are involved in",
    });
  }
}

/**
 * Middleware to ensure landlord can only create listings for themselves
 */
export async function verifyListingCreation(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const user = (request as AuthenticatedRequest).user;
  const body = request.body as { landlordId?: number };

  if (!user) {
    return reply.code(401).send({ error: "Unauthorized" });
  }

  // If landlordId is provided in body, verify it matches the authenticated user
  if (body.landlordId && body.landlordId !== user.id) {
    return reply.code(403).send({
      error: "Forbidden",
      message: "You can only create listings for yourself",
    });
  }

  // Automatically set landlordId to the authenticated user
  body.landlordId = user.id;
}
