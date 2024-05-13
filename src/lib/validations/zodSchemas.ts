import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(4)
    .max(31)
    .regex(/.*\d.*/),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(8),
  sourceInfo: z.string(),
});

export const verifyEmailSchema = z.object({ code: z.string() });

export const loginSchema = registerSchema.pick({
  username: true,
  password: true,
});

export const resendSchema = registerSchema
  .pick({ email: true })
  .merge(z.object({ id: z.string() }));
