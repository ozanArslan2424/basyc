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
	thing?: ThingData | null;
	onReset?: () => void;
	textareaRef?: RefObject<HTMLTextAreaElement | null>;
};

export function ThingForm({ textareaRef, thing, onReset, ...rest }: ThingFormProps) {
	const ctx = useAppContext();

	const thingCreateMutation = useMutation(
		ctx.thingService.create((res) => {
			ctx.queryService.queryClient.setQueryData<ThingData[]>([QK_THING.LIST], (prev) => (prev ? [...prev, res] : []));
			form.reset();
		}),
	);

	const thingUpdateMutation = useMutation(
		ctx.thingService.update((res) => {
			ctx.queryService.queryClient.setQueryData<ThingData[]>([QK_THING.LIST], (prev) =>
				prev ? prev.map((t) => (t.id === res.id ? res : t)) : [],
			);
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
		<Card {...rest}>
			<CardContent>
				<form {...form.methods} className="flex flex-col gap-2">
					<FormField form={form} name="content" id="content">
						<Textarea placeholder="thing goes here" required ref={textareaRef} />
					</FormField>
					{thing ? (
						<div className="grid grid-cols-3 items-center gap-2">
							<Button type="reset" variant="ghost" size="sm" className="col-span-1">
								Reset
							</Button>
							<Button type="submit" size="sm" className="col-span-2">
								Submit
							</Button>
						</div>
					) : (
						<Button type="submit" size="sm">
							Submit
						</Button>
					)}
				</form>
			</CardContent>
		</Card>
	);
}
