import { useAppContext } from "@/client";
import { FormField } from "@/components/form/form-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@/hooks/use-form";
import { ThingCreateDataSchema, type ThingData } from "@/schemas/thing.schemas";
import { QK_THING } from "@/services/thing/thing.keys";
import { useMutation } from "@tanstack/react-query";
import type { ComponentProps, RefObject } from "react";

type ThingFormProps = ComponentProps<"div"> & {
	textareaRef: RefObject<HTMLTextAreaElement | null>;
};

export function ThingForm({ textareaRef, ...rest }: ThingFormProps) {
	const ctx = useAppContext();

	const thingCreateMutation = useMutation(
		ctx.thingService.create((res) => {
			ctx.queryService.queryClient.setQueryData<ThingData[]>([QK_THING.LIST], (prev) => (prev ? [...prev, res] : []));
			form.reset();
		}),
	);

	const form = useForm({
		schema: ThingCreateDataSchema,
		onSubmit: (body) => thingCreateMutation.mutate(body),
	});

	return (
		<Card {...rest}>
			<CardContent>
				<form {...form.methods} className="flex flex-col gap-2">
					<FormField form={form} name="content" id="content">
						<Textarea placeholder="thing goes here" required ref={textareaRef} />
					</FormField>
					<Button size="sm">Submit</Button>
				</form>
			</CardContent>
		</Card>
	);
}
