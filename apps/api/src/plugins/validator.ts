import { FastifyRequest, FastifyReply } from "fastify";
import { z, ZodSchema } from "zod";

/**
 * Validation middleware factory for Zod schemas
 */
export function validateBody<T extends ZodSchema>(schema: T) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      request.body = schema.parse(request.body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.code(400).send({
          error: "Validation Error",
          message: "Invalid request data",
          details: error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
      }
      throw error;
    }
  };
}

/**
 * Validation middleware for URL parameters
 */
export function validateParams<T extends ZodSchema>(schema: T) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      request.params = schema.parse(request.params);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.code(400).send({
          error: "Validation Error",
          message: "Invalid parameters",
          details: error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
      }
      throw error;
    }
  };
}

/**
 * Validation middleware for query parameters
 */
export function validateQuery<T extends ZodSchema>(schema: T) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      request.query = schema.parse(request.query);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.code(400).send({
          error: "Validation Error",
          message: "Invalid query parameters",
          details: error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
      }
      throw error;
    }
  };
}
