import { buildApp } from "./app";
import { config } from "./config/env";

const fastify = buildApp();

const start = async () => {
  try {
    await fastify.listen({
      port: config.port,
      host: "0.0.0.0",
    });
    console.log(`🚀 Server running on http://localhost:${config.port}`);
    console.log(`📊 Health check: http://localhost:${config.port}/health`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down gracefully...");
  await fastify.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n🛑 Shutting down gracefully...");
  await fastify.close();
  process.exit(0);
});

start();
