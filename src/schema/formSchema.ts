import { z } from "zod";

export const BoundingBoxSchema = z.object({
  xmin: z.number(),
  ymin: z.number(),
  xmax: z.number(),
  ymax: z.number(),
});

export const FieldSchema = z.object({
  id: z.string(),
  section: z.string(),
  label: z.string(),
  type: z.enum([
    "text",
    "number",
    "email",
    "date",
    "checkbox",
  ]),
  value: z.union([
    z.string(),
    z.boolean(),
  ]),
  required: z.boolean(),
  page: z.number().int().positive(),
  boundingBox: BoundingBoxSchema,
});

export const FormSchema = z.object({
  documentTitle: z.string(),
  formTitle: z.string(),
  fields: z.array(FieldSchema),
});

export type FormResponse = z.infer<typeof FormSchema>;