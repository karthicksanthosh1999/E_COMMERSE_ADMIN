
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().trim().min(3, "Name must contain at least 3 characters"),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
  role: z.enum(["ADMIN", "USER"]),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export const updateUserSchema = createUserSchema.extend({
  password: z.string().optional().or(z.literal("")),
}).partial({
  password: true,
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
