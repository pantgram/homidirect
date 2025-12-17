import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import { FastifyReply, FastifyRegister, FastifyRequest } from "fastify";

export default fp(async (app) => {
  app.register(jwt, {
    secret: process.env.JWT_SECRET!,
  });

  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch {
        reply.code(401).send({ message: "Unauthorized" });
      }
    }
  );
});
