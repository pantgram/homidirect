import { FastifyInstance } from "fastify";
import { UserController } from "./users.controller";
import { verifyUserOwnership } from "@/middleware/authorization";

export async function userRoutes(fastify: FastifyInstance) {
  // Route to fetch all users - public for now (could be restricted to admins in future)
  fastify.get("", UserController.getAll);

  // Get user by ID - anyone can view
  fastify.get("/:id", UserController.getById);

  // Create user - public (registration)
  fastify.post("", UserController.create);

  // Update user - only the user themselves
  fastify.patch<{ Params: { id: string } }>(
    "/:id",
    {
      preValidation: [fastify.authenticate, verifyUserOwnership],
    },
    UserController.update as any
  );

  // Delete user - only the user themselves
  fastify.delete<{ Params: { id: string } }>(
    "/:id",
    {
      preValidation: [fastify.authenticate, verifyUserOwnership],
    },
    UserController.delete as any
  );
}
