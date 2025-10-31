import { useAppContext } from "@/client";
import { PageContent } from "@/components/page-content";
import { useDnd } from "@/hooks/use-dnd";
import { useVisualMode } from "@/hooks/use-visual-mode";
import { cn, repeat } from "@/lib/utils";
import { PersonCard } from "@/pages/dashboard/person-card";
import { ThingCard, ThingCardSkeleton } from "@/pages/dashboard/thing-card";
import { ThingForm } from "@/pages/dashboard/thing-form";
import { ErrorCard } from "@/pages/error/error-card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export function DashboardPage() {
	const ctx = useAppContext();
	const { t } = useTranslation("common");

	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	const thingListQuery = useQuery(ctx.thingService.queryList());
	const personListQuery = useQuery(ctx.personService.queryList());
	const thingAssignMutation = useMutation(ctx.thingService.assign());

	const vm = useVisualMode([
		{
			id: "form",
			onAction: () => {
				textareaRef.current?.focus();
			},
		},
		...(thingListQuery.data ?? []).map((t) => ({ id: `thing-${t.id}`, onAction: () => {} })),
		...(personListQuery.data ?? []).map((p) => ({ id: `person-${p.id}`, onAction: () => {} })),
	]);

	const thingDnd = useDnd({
		onDrop: (sourceData, targetData) => {
			const personId = Number(sourceData.sourceId);
			const thingId = Number(targetData.targetId);
			thingAssignMutation.mutate({ thingId, personId });
		},
	});

	// function handleThingDragStart(e: DragEvent<HTMLDivElement>, personId: number) {
	// 	e.dataTransfer.setData("personId", personId.toString());
	// }
	//
	// function handleThingDragOver(e: DragEvent<HTMLDivElement>) {
	// 	e.preventDefault();
	// 	e.dataTransfer.dropEffect = "move";
	// }
	//
	// function handleThingDrop(e: DragEvent<HTMLDivElement>, thingId: number) {
	// 	e.preventDefault();
	// 	const transferData = e.dataTransfer.getData("personId");
	// 	console.log(transferData);
	// 	const personId = parseInt(transferData);
	// 	thingAssignMutation.mutate({ thingId, personId });
	// }

	const browserTitle = t("app.name");
	const isError = thingListQuery.error || personListQuery.error;

	if (isError) {
		return <ErrorCard error={isError} />;
	}

	return (
		<PageContent browserTitle={browserTitle}>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-12">
				<div className="col-span-4 md:col-span-8">
					<div className="flex flex-col gap-4 lg:flex-row">
						<ThingForm
							textareaRef={textareaRef}
							className={cn(
								"outline-2 outline-transparent transition-all",
								"flex h-max flex-1 flex-col gap-4",
								vm.getIsFocused("form") && "outline-green-300",
							)}
							{...vm.registerElement("form")}
						/>

						<div className="flex flex-1 flex-col gap-4">
							{thingListQuery.isPending
								? repeat().map((i) => <ThingCardSkeleton key={i} />)
								: thingListQuery.data.map((thing) => (
										<ThingCard
											key={thing.id}
											thing={thing}
											onDragOver={thingDnd.handleDragOver}
											onDrop={(e) => thingDnd.handleDrop(e, { targetId: thing.id })}
											{...vm.registerElement(`thing-${thing.id}`)}
											className={cn(
												"outline-2 outline-transparent transition-all",
												vm.getIsFocused(`thing-${thing.id}`) && "outline-green-300",
											)}
										/>
									))}
						</div>
					</div>
				</div>

				<div className="col-span-4">
					<div className="hidden grid-cols-4 gap-4 sm:grid md:grid-cols-2 xl:grid-cols-4">
						{personListQuery.isPending
							? repeat().map((i) => <ThingCardSkeleton key={i} />)
							: personListQuery.data.map((person) => (
									<PersonCard
										person={person}
										key={person.id}
										{...vm.registerElement(`person-${person.id}`)}
										draggable
										onDragStart={(e) => thingDnd.handleDragStart(e, { sourceId: person.id })}
										isActive={vm.getIsFocused(`person-${person.id}`)}
										className={cn(
											"relative h-max w-max cursor-grab rounded-full outline-4 outline-transparent transition-all active:cursor-grabbing",
											vm.getIsFocused(`person-${person.id}`) && "outline-green-300",
										)}
									/>
								))}
					</div>
				</div>
			</div>
		</PageContent>
	);
}
