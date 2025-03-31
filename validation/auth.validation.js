import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(2).max(39),
  lastName: z.string().min(2).max(39),
  password: z
    .string()
    .min(8)
    .max(20)
    .regex(/^[A-Z]/)
    .regex(/[!@#$%^&*:"?><]/)
    .regex(/\d/),
  role: z.string().optional(),
  image: z.string().optional(),
  phonenumber: z.string(),
  email: z.string().email(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(20)
    .regex(/^[A-Z]/)
    .regex(/[!@#$%^&*:"?>]/)
    .regex(/\d/),
});
