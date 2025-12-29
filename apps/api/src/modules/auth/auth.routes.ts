import { FastifyInstance } from "fastify";
import { AuthController } from "./auth.controller";
import { validateBody } from "@/plugins/validator";
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
} from "@/schemas/auth.schema";

export async function authRoutes(fastify: FastifyInstance) {
  // Register - stricter rate limiting (5 requests per 15 minutes per IP)
  fastify.post(
    "/register",
    {
      config: {
        rateLimit: {
          max: 5,
          timeWindow: "15 minutes",
        },
      },
      preValidation: [validateBody(registerSchema)],
    },
    AuthController.register
  );

  // Login - stricter rate limiting (10 attempts per 15 minutes per IP)
  fastify.post(
    "/login",
    {
      config: {
        rateLimit: {
          max: 10,
          timeWindow: "15 minutes",
        },
      },
      preValidation: [validateBody(loginSchema)],
    },
    AuthController.login
  );

  // Refresh token - moderate rate limiting (20 per 15 minutes)
  fastify.post(
    "/refresh",
    {
      config: {
        rateLimit: {
          max: 20,
          timeWindow: "15 minutes",
        },
      },
      preValidation: [validateBody(refreshTokenSchema)],
    },
    AuthController.refresh
  );
}
