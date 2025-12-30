import { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "./users.service";
import { UpdateUser } from "./users.types";
import { NotFoundError, UnauthorizedError } from "@/utils/errors";

export const UserController = {
  async getById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const id = parseInt(request.params.id);
    const user = await UserService.getUserById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return reply.code(200).send({ user: user });
  },

  async update(
    request: FastifyRequest<{ Params: { id: string }; Body: UpdateUser }>,
    reply: FastifyReply
  ) {
    const id = parseInt(request.params.id);
    const user = await UserService.updateUser(id, request.body);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return reply.code(200).send({ user: user });
  },

  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const id = parseInt(request.params.id);
    const deleted = await UserService.deleteUser(id);

    if (!deleted) {
      throw new NotFoundError("User not found");
    }

    return reply.code(204).send();
  },

  async me(req: FastifyRequest, reply: FastifyReply) {
    if (!req.user) {
      throw new UnauthorizedError("Not authenticated");
    }
    return reply.send({ user: req.user });
  },
};
