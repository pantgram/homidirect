import { z } from "zod";

/**
 * Password validation rules
 */
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(100, "Password must not exceed 100 characters");

/**
 * Email validation
 */
const emailSchema = z.string().email("Invalid email address");

/**
 * Registration schema
 */
export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(100, "First name must not exceed 100 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(100, "Last name must not exceed 100 characters"),
  email: emailSchema,
  password: passwordSchema,
  role: z.enum(["LANDLORD", "TENANT"], {
    errorMap: () => ({ message: "Role must be either LANDLORD or TENANT" }),
  }),
});

/**
 * Login schema
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

/**
 * Refresh token schema
 */
export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
