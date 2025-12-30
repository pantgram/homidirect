import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "./auth.service";
import { NewUser } from "../users/users.model";
import { LoginInput, RefreshInput } from "./auth.types";
import {
  ConflictError,
  UnauthorizedError,
  InternalServerError,
} from "@/utils/errors";

export const AuthController = {
  async register(req: FastifyRequest<{ Body: NewUser }>, reply: FastifyReply) {
    try {
      const data = await AuthService.register(req.body, req.server);
      return reply.status(201).send(data);
    } catch (err: any) {
      req.log.error(err);
      if (err.message === "Email already registered") {
        throw new ConflictError("Email already registered");
      }
      throw new InternalServerError("Registration failed");
    }
  },

  async login(req: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) {
    try {
      const token = await AuthService.login(req.body, req.server);
      return reply.send({ token });
    } catch (err: any) {
      req.log.error(err);
      if (err.message === "Invalid credentials") {
        throw new UnauthorizedError("Invalid email or password");
      }
      throw new InternalServerError("Login failed");
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
      throw new UnauthorizedError("Invalid or expired refresh token");
    }
  },
};
