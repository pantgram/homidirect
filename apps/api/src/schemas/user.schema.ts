import { z } from "zod";

/**
 * User ID parameter schema
 */
export const userIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "User ID must be a valid number"),
});

/**
 * Update user schema
 */
export const updateUserSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(100, "First name must not exceed 100 characters")
    .optional(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(100, "Last name must not exceed 100 characters")
    .optional(),
  email: z.string().email("Invalid email address").optional(),
});

export type UserIdParam = z.infer<typeof userIdParamSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
