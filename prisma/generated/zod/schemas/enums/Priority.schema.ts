import * as z from "zod";

export const PrioritySchema = z.enum(["low", "medium", "high", "extreme"]);

export type Priority = z.infer<typeof PrioritySchema>;
