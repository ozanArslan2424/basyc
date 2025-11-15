import { PersonSchema, ThingSchema } from "prisma/generated/zod/schemas";
import z from "zod";

export const ThingDataSchema = ThingSchema.extend({ assignedTo: PersonSchema.nullable() });

export type ThingData = z.infer<typeof ThingDataSchema>;

export const ThingCreateDataSchema = z.object({
	content: z.string().min(1, "Everything must have some content"),
	dueDate: z
		.string()
		.nullable()
		.transform((v) => (v ? new Date(v) : null)),
});

export type ThingCreateData = z.infer<typeof ThingCreateDataSchema>;

export const ThingUpdateDataSchema = ThingCreateDataSchema.extend({
	thingId: z.number(),
});

export type ThingUpdateData = z.infer<typeof ThingUpdateDataSchema>;

export const ThingAssignDataSchema = z.object({
	thingId: z.number(),
	personId: z.number(),
});

export type ThingAssignData = z.infer<typeof ThingAssignDataSchema>;

export const ThingRemoveDataSchema = z.object({
	thingId: z.number(),
});

export type ThingRemoveData = z.infer<typeof ThingRemoveDataSchema>;

export const ThingDoneDataSchema = z.object({
	thingId: z.number(),
	isDone: z.boolean(),
});

export type ThingDoneData = z.infer<typeof ThingDoneDataSchema>;
