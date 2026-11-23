
import { z } from "zod";

const attributeField = z.object({
  key: z.string().regex(/^[a-zA-Z][a-zA-Z0-9]*$/), label: z.string(),
  type: z.enum(['text', 'number', 'boolean', 'select']), options: z.array(z.string()).optional(),
  required: z.boolean().optional(),
});

export const createCategorySchema = z.object({
  name: z.string().trim().min(3, "Name must contain at least 3 characters"),
  description: z.string().trim().nullable(),
  slug: z.string().trim().min(3, "Slug must contain at least 3 characters"),
  parentId: z.string().trim().nullable(),
  attributeSchema: z.array(attributeField).optional(), 
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();

export type CreateCategoryDto = z.infer<typeof createCategorySchema>;
export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>;
