import z from "zod";

export const ThingCreateDataSchema = z.object({
	content: z.string().min(1, "Everything must have some content"),
});

export type ThingCreateData = z.infer<typeof ThingCreateDataSchema>;
