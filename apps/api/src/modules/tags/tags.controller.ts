import { FastifyRequest, FastifyReply } from "fastify";
import { TagService } from "./tags.service";
import { CreateTagDTO, UpdateTagDTO } from "./tags.types";

export const TagController = {
  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const tags = await TagService.getAllTags();
      return reply.code(200).send({ data: tags });
    } catch (error) {
      return reply.code(500).send({ error: "Internal server error" });
    }
  },

  async getById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const id = parseInt(request.params.id);
      const tag = await TagService.getTagById(id);

      if (!tag) {
        return reply.code(404).send({ error: "Tag not found" });
      }

      return reply.code(200).send({ data: tag });
    } catch (error) {
      return reply.code(500).send({ error: "Internal server error" });
    }
  },

  async create(
    request: FastifyRequest<{ Body: CreateTagDTO }>,
    reply: FastifyReply
  ) {
    try {
      const tag = await TagService.createTag(request.body);
      return reply.code(201).send({ data: tag });
    } catch (error) {
      return reply.code(500).send({ error: "Internal server error" });
    }
  },

  async update(
    request: FastifyRequest<{ Params: { id: string }; Body: UpdateTagDTO }>,
    reply: FastifyReply
  ) {
    try {
      const id = parseInt(request.params.id);
      const tag = await TagService.updateTag(id, request.body);

      if (!tag) {
        return reply.code(404).send({ error: "Tag not found" });
      }

      return reply.code(200).send({ data: tag });
    } catch (error) {
      return reply.code(500).send({ error: "Internal server error" });
    }
  },

  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const id = parseInt(request.params.id);
      const deleted = await TagService.deleteTag(id);

      if (!deleted) {
        return reply.code(404).send({ error: "Tag not found" });
      }

      return reply.code(204).send();
    } catch (error) {
      return reply.code(500).send({ error: "Internal server error" });
    }
  },
};
