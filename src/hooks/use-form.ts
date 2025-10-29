import type { TFormErrors } from "@/lib/helper.type";
import { useCallback, useRef, useState } from "react";
import { z } from "zod/v4";

type UseFormArgs<T> = {
	schema: z.ZodType<T>;
	onSubmit: (values: T, formData: FormData) => void | Promise<void>;
	onReset?: () => void;
	defaultValues?: Partial<T>;
};

export type UseFormReturn<T> = {
	methods: {
		onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
		onReset: () => void;
		ref: React.RefObject<HTMLFormElement | null>;
		noValidate?: boolean;
	};
	defaultValues: Partial<T> | undefined;
	errors: TFormErrors<T>;
	setRootError: (rootError: string) => void;
	reset: () => void;
};

export function useForm<T>(args: UseFormArgs<T>): UseFormReturn<T> {
	const [errors, setErrors] = useState<TFormErrors<T>>();
	const ref = useRef<HTMLFormElement>(null);

	const onSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const formData = new FormData(e.currentTarget);
			const formDataEntries = formData.entries();
			const formDataObject = Object.fromEntries(formDataEntries);
			const parseResult = args.schema.safeParse(formDataObject);
			if (!parseResult.success) {
				setErrors({
					...z.flattenError(parseResult.error).fieldErrors,
					_root: [],
				});
				return;
			}
			setErrors(undefined);
			args.onSubmit(parseResult.data, formData);
		},
		[args],
	);

	const onReset = useCallback(() => {
		ref.current?.reset();
		setErrors(undefined);
		args.onReset?.();
	}, [args]);

	const reset = useCallback(() => {
		ref.current?.reset();
		setErrors(undefined);
	}, []);

	const setRootError = useCallback((rootError: string | Array<string>) => {
		setErrors((prev) => ({
			...prev,
			_root: Array.isArray(rootError) ? rootError : [rootError],
		}));
	}, []);

	return {
		methods: { onSubmit, onReset, ref, noValidate: true },
		errors,
		defaultValues: args.defaultValues,
		reset,
		setRootError,
	};
}
