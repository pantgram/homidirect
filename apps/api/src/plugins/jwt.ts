import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import { FastifyReply, FastifyRequest } from "fastify";

export default fp(async (app) => {
  app.register(jwt, {
    secret: process.env.JWT_SECRET!,
  });

  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const payload = await request.jwtVerify();
        // Attach user info to request
        (request as any).user = {
          id: (payload as any).id,
          email: (payload as any).email,
          role: (payload as any).role
        };
      } catch {
        reply.code(401).send({ message: "Unauthorized" });
      }
    }
  );
});
