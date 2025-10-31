import { useAppContext } from "@/client";
import { FormField } from "@/components/form/form-field";
import { PageContent } from "@/components/page-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@/hooks/use-form";
import { cn } from "@/lib/utils";
import { ThingCreateDataSchema } from "@/schemas/thing.schemas";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import type { DragEvent, Ref } from "react";
import { useTranslation } from "react-i18next";

export function DashboardPage() {
	const ctx = useAppContext();
	const { t } = useTranslation("common");

	const thingListQuery = useSuspenseQuery(ctx.thingService.queryList());
	const personListQuery = useSuspenseQuery(ctx.personService.queryList());
	const thingCreateMutation = useMutation(ctx.thingService.create());
	const thingAssignMutation = useMutation(ctx.thingService.assign());

	const { registerElement, getIsFocused } = useVisualMode([
		{ id: "form", onAction: () => {} },
		...thingListQuery.data.map((t) => ({ id: `thing-${t.id}`, onAction: () => {} })),
		...personListQuery.data.map((p) => ({ id: `person-${p.id}`, onAction: () => {} })),
	]);

	const form = useForm({
		schema: ThingCreateDataSchema,
		onSubmit: (body) => {
			thingCreateMutation.mutate(body, {
				onSuccess: () => {
					form.reset();
				},
			});
		},
	});

	function handleDragStart(e: DragEvent<HTMLDivElement>, personId: number) {
		e.dataTransfer.setData("personId", personId.toString());
	}

	function handleDragOver(e: DragEvent<HTMLDivElement>) {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	}

	function handleDrop(e: DragEvent<HTMLDivElement>, thingId: number) {
		e.preventDefault();
		const transferData = e.dataTransfer.getData("personId");
		console.log(transferData);
		const personId = parseInt(transferData);
		thingAssignMutation.mutate({ thingId, personId });
	}

	const browserTitle = t("app.name");

	return (
		<PageContent browserTitle={browserTitle}>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-12">
				<div className="col-span-4 md:col-span-8">
					<div className="flex flex-col gap-4 lg:flex-row">
						<Card
							className={cn("flex h-max flex-1 flex-col gap-4", getIsFocused(0) && "outline-2 outline-green-300")}
							{...registerElement(0)}
						>
							<CardContent>
								<form {...form.methods} className="flex flex-col gap-2">
									<FormField form={form} name="content" id="content">
										<Textarea placeholder="thing goes here" required className="relative" />
									</FormField>
									<Button size="sm">Submit</Button>
								</form>
							</CardContent>
						</Card>

						<div className="flex flex-1 flex-col gap-4">
							{thingListQuery.data.map((thing, index) => (
								<Card
									onDragOver={handleDragOver}
									onDrop={(e) => handleDrop(e, thing.id)}
									key={thing.id}
									{...registerElement(1 + index)}
									className={cn(getIsFocused(1 + index) && "outline-2 outline-green-300")}
								>
									<CardContent className="flex gap-4">
										{thing.assignedTo ? (
											<img
												src={thing.assignedTo.image ?? undefined}
												alt={thing.assignedTo.name}
												height={40}
												width={40}
												className="ring-border aspect-square h-10 w-10 rounded-full ring"
											/>
										) : (
											<div className="ring-border flex aspect-square h-10 w-10 items-center justify-center rounded-full ring">
												<span className="text-xl font-black">?</span>
											</div>
										)}

										<div className="flex flex-col gap-2 py-1">
											<p className="text-muted-foreground text-xs leading-0 font-bold">
												{thing.assignedTo ? thing.assignedTo.name : "Nobody"} is on this
											</p>
											<p>{thing.content}</p>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</div>

				<div className="col-span-4">
					<div className="hidden grid-cols-4 gap-4 sm:grid md:grid-cols-2 xl:grid-cols-4">
						{personListQuery.data.map((person, index) => (
							<div
								key={person.id}
								{...registerElement(thingListQuery.data.length + 1 + index)}
								className={cn(
									"relative h-max w-max cursor-grab rounded-full active:cursor-grabbing",
									getIsFocused(thingListQuery.data.length + 1 + index) && "outline-4 outline-green-300",
								)}
								draggable
								onDragStart={(e) => handleDragStart(e, person.id)}
							>
								<img
									src={person.image ?? undefined}
									alt={person.name}
									className={cn(
										"bg-background aspect-square rounded-full border shadow-xs select-none",
										"xl:h-24 xl:w-24",
										"lg:h-20 lg:w-20",
										"md:h-16 md:w-16",
										"sm:h-24 sm:w-24",
										"h-24 w-24",
									)}
									height={100}
									width={100}
								/>
								<span
									className={cn(
										"bg-background absolute left-1/2 w-max -translate-x-1/2 overflow-hidden rounded-md border px-2 py-1 font-bold whitespace-nowrap shadow-sm select-none",
										"xl:bottom-0 xl:text-sm",
										"lg:-bottom-2 lg:text-xs",
										"md:-bottom-2 md:text-xs",
										"sm:bottom-0 sm:text-xs",
										"bottom-0 text-xs",
										getIsFocused(thingListQuery.data.length + 1 + index) &&
											"before:pointer-events-none before:absolute before:inset-0 before:bg-green-500 before:opacity-20",
									)}
								>
									{person.name}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</PageContent>
	);
}

import { useState, useEffect, useRef, useCallback } from "react";

type El = HTMLDivElement;

// Custom hook for visual mode
export function useVisualMode(els: { id: string; onAction: () => void }[] = []) {
	const [isVisualMode, setIsVisualMode] = useState(false);
	const [currentFocusIndex, setCurrentFocusIndex] = useState(-1);
	const keyPressBuffer = useRef<string[]>([]);
	const [lastKeyPressTime, setLastKeyPressTime] = useState(0);

	const elementRefs = useRef<El[]>([]);

	const getEl = useCallback((id: string) => els.find((el) => el.id === id), [els]);

	useEffect(() => {
		elementRefs.current = elementRefs.current.slice(0, Object.keys(els).length);
	}, [els]);

	// Handle key sequence detection for "space + v + v"
	const handleKeySequence = useCallback(
		(e: KeyboardEvent) => {
			const currentTime = Date.now();

			if (e.code === "Space") {
				keyPressBuffer.current = ["Space"];
				setLastKeyPressTime(currentTime);
				return;
			}

			if (keyPressBuffer.current.length > 0 && currentTime - lastKeyPressTime > 500) {
				keyPressBuffer.current = [];
				return;
			}

			if (keyPressBuffer.current.length === 1 && keyPressBuffer.current[0] === "Space" && e.key === "v") {
				keyPressBuffer.current = ["Space", "v"];
				setLastKeyPressTime(currentTime);
			} else if (keyPressBuffer.current.length === 2 && keyPressBuffer.current[1] === "v" && e.key === "v") {
				setIsVisualMode((prev) => !prev);
				keyPressBuffer.current = [];
				e.preventDefault();
			} else {
				keyPressBuffer.current = [];
			}
		},
		[keyPressBuffer, lastKeyPressTime],
	);

	// Handle arrow key navigation in visual mode
	const handleArrowNavigation = useCallback(
		(e: KeyboardEvent) => {
			if (!isVisualMode) return;

			const { key } = e;

			if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)) {
				e.preventDefault();

				let newIndex = currentFocusIndex;
				const totalElements = elementRefs.current.length;

				switch (key) {
					case "ArrowRight":
					case "ArrowDown":
						newIndex = (currentFocusIndex + 1) % totalElements;
						break;
					case "ArrowLeft":
					case "ArrowUp":
						newIndex = (currentFocusIndex - 1 + totalElements) % totalElements;
						break;
					default:
						break;
				}

				setCurrentFocusIndex(newIndex);
			}
		},
		[isVisualMode, currentFocusIndex],
	);

	// Handle Enter key to open dialog
	const handleEnterKey = useCallback(
		(e: KeyboardEvent) => {
			if (!isVisualMode || currentFocusIndex === -1 || e.key !== "Enter") return;
			e.preventDefault();
			const currEl = elementRefs.current[currentFocusIndex];
			const elId = currEl?.id;
			if (!elId) return;
			const el = getEl(elId);
			if (!el || !el.onAction) return;
			el.onAction();
		},
		[isVisualMode, currentFocusIndex, getEl],
	);
	const handleEscapeKey = useCallback(
		(e: KeyboardEvent) => {
			if (isVisualMode && e.key === "Escape") {
				setIsVisualMode(false);
				setCurrentFocusIndex(-1);
			}
		},
		[isVisualMode],
	);

	// Main keyboard event handler
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			handleKeySequence(e);
			handleArrowNavigation(e);
			handleEnterKey(e);
			handleEscapeKey(e);
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [handleKeySequence, handleArrowNavigation, handleEnterKey, handleEscapeKey]);

	// Focus management
	useEffect(() => {
		if (isVisualMode && currentFocusIndex >= 0) {
			const currentElement = elementRefs.current[currentFocusIndex];
			if (currentElement) {
				currentElement.focus();
			}
		}
	}, [isVisualMode, currentFocusIndex]);

	// Register element ref
	const registerElement = useCallback(
		(
			index: number,
		): {
			ref: Ref<El>;
			id: string;
			tabIndex: number;
		} => ({
			ref: (el: El) => {
				elementRefs.current[index] = el;
			},
			id: elementRefs.current[index]?.id ?? "",
			tabIndex: -1,
		}),
		[],
	);

	const getIsFocused = useCallback(
		(i: number) => isVisualMode && currentFocusIndex === i,
		[isVisualMode, currentFocusIndex],
	);

	return {
		isVisualMode,
		currentFocusIndex,
		registerElement,
		getIsFocused,
		elementRefs: elementRefs.current,
	};
}
