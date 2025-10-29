import type { UseFormReturn } from "@/hooks/use-form";
import { ErrorLabel, Label } from "../ui/label";
import { cloneElement, type ReactElement } from "react";
import { cn } from "@/lib/utils";

type FormFieldProps<F> = {
	id?: string;
	name: keyof F extends string ? keyof F : never;
	label?: string;
	form: UseFormReturn<F>;
	children: ReactElement<
		{ id: string; name: string; defaultValue?: string | undefined },
		React.FunctionComponent
	>;
	className?: string;
	sublabel?: string;
};

export function FormField<F>(props: FormFieldProps<F>) {
	const htmlFor = props.id || props.name;

	const node = cloneElement<{
		id: string;
		name: string;
		defaultValue?: string | undefined;
	}>(props.children, {
		id: htmlFor,
		name: props.name as string,
		defaultValue:
			(props.form.defaultValues?.[props.name as keyof typeof props.form.defaultValues] as string) ??
			"",
	});

	return (
		<div className={cn("flex flex-col gap-2", props.className)}>
			<Label htmlFor={htmlFor}>{props.label}</Label>

			{node}

			{props.sublabel && (
				<Label htmlFor={htmlFor} className="text-muted-foreground text-xs">
					{props.sublabel}
				</Label>
			)}

			<ErrorLabel htmlFor={htmlFor}>
				{props.form.errors?.[props.name as keyof typeof props.form.errors]}
			</ErrorLabel>
		</div>
	);
}
