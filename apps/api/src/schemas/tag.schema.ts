import { z } from "zod";

/**
 * Tag ID parameter schema
 */
export const tagIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Tag ID must be a valid number"),
});

/**
 * Create tag schema
 */
export const createTagSchema = z.object({
  name: z
    .string()
    .min(1, "Tag name is required")
    .max(50, "Tag name must not exceed 50 characters"),
});

/**
 * Update tag schema
 */
export const updateTagSchema = z.object({
  name: z
    .string()
    .min(1, "Tag name is required")
    .max(50, "Tag name must not exceed 50 characters"),
});

export type TagIdParam = z.infer<typeof tagIdParamSchema>;
export type CreateTagInput = z.infer<typeof createTagSchema>;
export type UpdateTagInput = z.infer<typeof updateTagSchema>;
