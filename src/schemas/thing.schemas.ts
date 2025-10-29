import type { Prettify } from "@/lib/helper.type";
import type { Person, Thing } from "prisma/generated";
import z from "zod";

export const ThingCreateDataSchema = z.object({
	content: z.string().min(1, "Everything must have some content"),
});

export type ThingCreateData = z.infer<typeof ThingCreateDataSchema>;

export const ThingAssignDataSchema = z.object({
	thingId: z.number(),
	personId: z.number(),
});

export type ThingAssignData = z.infer<typeof ThingAssignDataSchema>;

export type ThingData = Prettify<
	Thing & {
		assignedTo: Person | null;
	}
>;
