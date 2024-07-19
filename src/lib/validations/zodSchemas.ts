import { z } from "zod";
import {
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "$lib/constants";

export const registerSchema = z.object({
  username: z
    .string()
    .min(MIN_USERNAME_LENGTH)
    .max(MAX_USERNAME_LENGTH)
    .regex(/.*\d.*/),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(MIN_PASSWORD_LENGTH),
  confirmPassword: z.string().min(MIN_PASSWORD_LENGTH),
  sourceInfo: z.string(),
  showPassword: z.boolean().optional(),
  showConfirmPassword: z.boolean().optional(),
});

export const verifyEmailSchema = z.object({ code: z.string() });

export const loginSchema = registerSchema.pick({
  username: true,
  password: true,
  showPassword: true,
});

export const resendSchema = registerSchema
  .pick({ email: true })
  .merge(z.object({ id: z.string() }));

export const resetPasswordEmailSchema = registerSchema.pick({ email: true });

export const resetPasswordTokenSchema = registerSchema
  .pick({
    password: true,
    confirmPassword: true,
    showPassword: true,
    showConfirmPassword: true,
  })
  .merge(z.object({ resetPasswordToken: z.string().optional() }));

export const userRoleSchema = z.object({
  role: z.enum(["parent", "student", "tutor"]),
});

export const contactUsSchema = registerSchema
  .pick({
    firstName: true,
    lastName: true,
    email: true,
  })
  .merge(z.object({ message: z.string(), isSendNewsLetter: z.boolean() }));
