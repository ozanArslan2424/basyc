import * as z from "zod";
import { AttachmentTypeSchema } from "../enums/AttachmentType.schema";

export const AttachmentSchema = z.object({
	id: z.number().int(),
	createdAt: z.date(),
	updatedAt: z.date(),
	type: AttachmentTypeSchema,
	url: z.string(),
	size: z.number(),
	createdById: z.number().int(),
	thingId: z.number().int(),
});

export type AttachmentType = z.infer<typeof AttachmentSchema>;
