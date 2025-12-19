import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { config } from "./config/env";
import { apiRoutes } from "./modules/index";
import jwtPlugin from "./plugins/jwt";

export function buildApp() {
  const fastify = Fastify({
    routerOptions: { caseSensitive: false },
    logger: {
      level: config.nodeEnv === "development" ? "info" : "error",
    },
  });

  // Register plugins
  fastify.register(cors);
  fastify.register(helmet);
  fastify.register(jwtPlugin);
  // Health check
  fastify.get("/health", async () => {
    return { status: "ok", timestamp: new Date().toISOString() };
  });

  // Register routes
  fastify.register(apiRoutes, { prefix: "/api" });

  return fastify;
}
