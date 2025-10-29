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
import type { DragEvent } from "react";
import { useTranslation } from "react-i18next";

export function DashboardPage() {
	const ctx = useAppContext();
	const { t } = useTranslation("common");
	const browserTitle = t("app.name");

	const personListQuery = useSuspenseQuery(ctx.personService.queryList());
	const thingListQuery = useSuspenseQuery(ctx.thingService.queryList());
	const thingCreateMutation = useMutation(ctx.thingService.create());
	const thingAssignMutation = useMutation(ctx.thingService.assign());

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

	return (
		<PageContent browserTitle={browserTitle}>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-12">
				<div className="col-span-4 md:col-span-8">
					<div className="flex flex-col gap-4 lg:flex-row">
						<div className="flex flex-1 flex-col gap-4">
							<Card>
								<CardContent>
									<form {...form.methods} className="flex flex-col gap-2">
										<FormField form={form} name="content" id="content">
											<Textarea placeholder="thing goes here" required className="relative" />
										</FormField>
										<Button size="sm">Submit</Button>
									</form>
								</CardContent>
							</Card>
						</div>

						<div className="flex flex-1 flex-col gap-4">
							{thingListQuery.data.map((thing) => (
								<Card
									key={thing.id}
									onDragOver={handleDragOver}
									onDrop={(e) => handleDrop(e, thing.id)}
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
						{personListQuery.data.map((person) => (
							<div
								draggable
								onDragStart={(e) => handleDragStart(e, person.id)}
								key={person.id}
								className="relative h-max w-max cursor-grab active:cursor-grabbing"
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
										"bg-background absolute left-1/2 w-max -translate-x-1/2 rounded-md border px-2 py-1 font-bold whitespace-nowrap shadow-sm select-none",
										"xl:bottom-0 xl:text-sm",
										"lg:-bottom-2 lg:text-xs",
										"md:-bottom-2 md:text-xs",
										"sm:bottom-0 sm:text-xs",
										"bottom-0 text-xs",
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
