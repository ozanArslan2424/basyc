import * as z from "zod";

export const AttachmentTypeSchema = z.enum(["image", "document", "other"]);

export type AttachmentType = z.infer<typeof AttachmentTypeSchema>;
