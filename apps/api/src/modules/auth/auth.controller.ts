import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "./auth.service";
import { NewUser } from "../users/users.model";
import { LoginInput, RefreshInput } from "./auth.types";

export const AuthController = {
  async register(req: FastifyRequest<{ Body: NewUser }>, reply: FastifyReply) {
    try {
      const data = await AuthService.register(req.body);
      return reply.status(201).send(data);
    } catch (err: any) {
      req.log.error(err);
      return reply
        .status(400)
        .send({ message: err.message || "Registration failed" });
    }
  },

  async login(req: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) {
    try {
      const token = await AuthService.login(req.body);
      return reply.send({ token });
    } catch (err: any) {
      req.log.error(err);
      return reply
        .status(401)
        .send({ message: err.message || "Invalid credentials" });
    }
  },

  async refresh(
    req: FastifyRequest<{ Body: RefreshInput }>,
    reply: FastifyReply
  ) {
    try {
      const tokens = await AuthService.refresh(req.body, req.server);
      return reply.send({ tokens });
    } catch (err: any) {
      req.log.error(err);
      return reply
        .status(401)
        .send({ message: err.message || "Invalid refresh token" });
    }
  },

  async me(req: FastifyRequest, reply: FastifyReply) {
    if (!req.user) {
      return reply.status(401).send({ message: "Not authenticated" });
    }
    return reply.send({ user: req.user });
  },
};
