import { useAppContext } from "@/client";
import { FormField } from "@/components/form/form-field";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@/hooks/use-form";
import { ThingCreateDataSchema, type ThingData } from "@/schemas/thing.schemas";
import { useMutation } from "@tanstack/react-query";
import type { RefObject } from "react";

type ThingFormProps = {
	thing?: ThingData | null;
	onReset?: () => void;
	textareaRef?: RefObject<HTMLTextAreaElement | null>;
};

export function ThingForm({ textareaRef, thing, onReset }: ThingFormProps) {
	const ctx = useAppContext();

	const thingCreateMutation = useMutation(
		ctx.thingService.create(() => {
			form.reset();
		}),
	);

	const thingUpdateMutation = useMutation(
		ctx.thingService.update(() => {
			form.reset();
		}),
	);

	const form = useForm({
		schema: ThingCreateDataSchema,
		defaultValues: {
			content: thing?.content,
		},
		onSubmit: (body) => {
			if (thing) {
				thingUpdateMutation.mutate({ thingId: thing.id, ...body });
			} else {
				thingCreateMutation.mutate(body);
			}
		},
		onReset,
	});

	return (
		<form {...form.methods} className="flex flex-col gap-4">
			<FormField form={form} name="content" id="content">
				<Textarea
					ref={textareaRef}
					className="text-base"
					placeholder="Thing goes here"
					title="This is where you write the contents of the thing to save it."
					required
				/>
			</FormField>
			{thing ? (
				<div className="grid grid-cols-3 items-center gap-2">
					<Button type="reset" variant="ghost" className="col-span-1">
						Cancel
					</Button>
					<Button type="submit" className="col-span-2">
						Submit
					</Button>
				</div>
			) : (
				<Button type="submit">Submit</Button>
			)}
		</form>
	);
}
