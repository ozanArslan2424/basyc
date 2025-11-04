import { useAppContext } from "@/client";
import { PageContent } from "@/components/page-content";
import { useActiveEntity } from "@/hooks/use-active-entity";
import { useDialog } from "@/hooks/use-dialog";
import { useDnd } from "@/hooks/use-dnd";
import { useModeContext } from "@/hooks/use-mode";
import { cn, repeat } from "@/lib/utils";
import { PersonCard } from "@/pages/dashboard/person-card";
import { ThingCard, ThingCardSkeleton } from "@/pages/dashboard/thing/thing-card";
import { ThingForm } from "@/pages/dashboard/thing/thing-form";
import { ErrorCard } from "@/pages/error/error-card";
import type { ThingData } from "@/schemas/thing.schemas";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Person } from "prisma/generated";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
import { ConfirmDialog } from "@/components/dialogs/confirm-dialog";
import { ActionDialog } from "@/modals/action-dialog";
import { ThingUpdateDialog } from "@/pages/dashboard/thing/thing-update-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { ThingDetailDialog } from "@/pages/dashboard/thing/thing-detail-dialog";

export function DashboardPage() {
	const ctx = useAppContext();
	const modeCtx = useModeContext();
	const { t } = useTranslation("common");

	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	const personListQuery = useQuery(ctx.personService.queryList());
	const personActive = useActiveEntity<Person>();
	const personActionDialog = useDialog();

	const thingListQuery = useQuery(ctx.thingService.queryList());
	const thingAssignMutation = useMutation(ctx.thingService.assign());
	const thingDoneMutation = useMutation(ctx.thingService.done());
	const thingDeleteMutation = useMutation(ctx.thingService.delete());
	const thingActive = useActiveEntity<ThingData>();
	const thingActionDialog = useDialog();
	const thingUpdateDialog = useDialog();
	const thingDetailDialog = useDialog();
	const thingDeleteDialog = useConfirmDialog(handleConfirmThingDelete);
	const thingActions = [
		{
			key: "detail",
			label: "See details",
			onSelect: () => {
				thingDetailDialog.onOpenChange(true);
			},
		},
		{
			key: "update",
			label: "Update content",
			onSelect: () => {
				thingUpdateDialog.onOpenChange(true);
			},
		},
		{ key: "assign", label: "Assign to someone", onSelect: () => {} },
		{
			key: "delete",
			label: "Delete",
			onSelect: () => {
				thingDeleteDialog.onOpenChange(true);
			},
		},
	];

	const assignmentDnd = useDnd({
		onDrop: (sourceData, targetData) => {
			const personId = Number(sourceData.sourceId);
			const thingId = Number(targetData.targetId);
			thingAssignMutation.mutate({ thingId, personId });
		},
	});

	const doneDnd = useDnd({
		onDrop: (sourceData, targetData) => {
			const thingId = Number(sourceData.sourceId);
			const isDone = targetData.targetId === "done";
			thingDoneMutation.mutate({ thingId, isDone });
		},
	});

	useEffect(() => {
		if (personListQuery.data && thingListQuery.data) {
			modeCtx.setEls([
				{ id: "form", onAction: () => textareaRef.current?.focus() },
				...thingListQuery.data.map((t) => ({
					id: `thing-${t.id}`,
					onAction: () => {
						thingActive.set(t);
						thingActionDialog.onOpenChange(true);
					},
				})),
				...personListQuery.data.map((p) => ({
					id: `person-${p.id}`,
					onAction: () => {
						personActive.set(p);
						personActionDialog.onOpenChange(true);
					},
				})),
			]);
		}
		// oxlint-disable-next-line exhaustive-deps
	}, [personListQuery.data, thingListQuery.data]);

	function handleConfirmThingDelete() {
		if (!thingActive.entity) {
			toast.error("Nothing selected!");
			return;
		}
		thingDeleteMutation.mutate({ thingId: thingActive.entity.id });
		thingActive.set(null);
	}

	function handleThingClick(thing: ThingData) {
		thingActive.set(thing);
		thingActionDialog.onOpenChange(true);
	}

	function handlePersonClick(person: Person) {
		personActive.set(person);
	}

	const browserTitle = t("app.name");
	const error = thingListQuery.error || personListQuery.error;

	if (error) {
		return <ErrorCard error={error} />;
	}

	return (
		<>
			<ActionDialog actions={thingActions} {...thingActionDialog} />
			<ThingDetailDialog thing={thingActive.entity} {...thingDetailDialog} />
			<ThingUpdateDialog thing={thingActive.entity} {...thingUpdateDialog} />
			<ConfirmDialog
				title="You are about to delete this thing."
				description="Once a thing is deleted, it stays deleted. Are you sure?"
				{...thingDeleteDialog}
			/>

			<PageContent browserTitle={browserTitle}>
				<div className="grid grid-cols-12 gap-8">
					<div className="col-span-4">
						<div className="flex w-full flex-col gap-4">
							<div className="flex flex-col gap-4">
								<h1 className="text-lg font-bold">Write a thing</h1>
								<Card
									className={cn(
										"outline-2 outline-transparent transition-all",
										"drop-zone flex h-max flex-1 flex-col gap-3",
										modeCtx.getIsFocused("form") && "outline-ring",
									)}
									{...modeCtx.registerElement("form")}
								>
									<CardContent>
										<ThingForm textareaRef={textareaRef} />
									</CardContent>
								</Card>
							</div>

							<div className="flex flex-col gap-4">
								<div
									className={cn(
										"rounded-lg border p-4 transition-colors",
										doneDnd.getIsOver("done")
											? "text-foreground border-primary"
											: "text-muted-foreground border-border",
									)}
									onDragOver={(e) => doneDnd.handleDragOver(e, "done")}
									onDrop={(e) => doneDnd.handleDrop(e, { targetId: "done" })}
								>
									<p className="text-center text-sm font-semibold">Drag here to mark as done</p>
								</div>

								{thingListQuery.isPending
									? repeat().map((i) => <ThingCardSkeleton key={i} />)
									: thingListQuery.data
											.filter((t) => t.isDone)
											.map((thing) => (
												<ThingCard
													key={thing.id}
													thing={thing}
													draggable
													onDragStart={(e) => assignmentDnd.handleDragStart(e, { sourceId: thing.id })}
													onDragOver={(e) => assignmentDnd.handleDragOver(e, thing.id)}
													onDrop={(e) => assignmentDnd.handleDrop(e, { targetId: thing.id })}
													{...modeCtx.registerElement(`thing-${thing.id}`)}
													className={cn(
														"outline-2 outline-transparent transition-all",
														"hover:outline-secondary cursor-pointer",
														modeCtx.getIsFocused(`thing-${thing.id}`) && "outline-ring",
														assignmentDnd.getIsOver(thing.id) && "outline-secondary",
														thing.isDone && "opacity-50 hover:opacity-100",
													)}
													onClick={() => handleThingClick(thing)}
												/>
											))}
							</div>
						</div>
					</div>

					<div className="col-span-4">
						<div className="flex flex-1 flex-col gap-4">
							<h1 className="text-lg font-bold">Things</h1>

							{thingListQuery.isPending
								? repeat().map((i) => <ThingCardSkeleton key={i} />)
								: thingListQuery.data
										.filter((t) => !t.isDone)
										.map((thing) => (
											<ThingCard
												key={thing.id}
												thing={thing}
												draggable
												onDragStart={(e) => assignmentDnd.handleDragStart(e, { sourceId: thing.id })}
												onDragOver={(e) => assignmentDnd.handleDragOver(e, thing.id)}
												onDrop={(e) => assignmentDnd.handleDrop(e, { targetId: thing.id })}
												{...modeCtx.registerElement(`thing-${thing.id}`)}
												className={cn(
													"outline-2 outline-transparent transition-all",
													"hover:outline-secondary cursor-pointer",
													modeCtx.getIsFocused(`thing-${thing.id}`) && "outline-ring",
													assignmentDnd.getIsOver(thing.id) && "outline-secondary",
													thing.isDone && "opacity-50 hover:opacity-100",
												)}
												onClick={() => handleThingClick(thing)}
											/>
										))}

							<div
								className={cn(
									"rounded-lg border p-4 transition-colors",
									doneDnd.getIsOver("not-done")
										? "text-foreground border-primary"
										: "text-muted-foreground border-border",
								)}
								onDragOver={(e) => doneDnd.handleDragOver(e, "not-done")}
								onDrop={(e) => doneDnd.handleDrop(e, { targetId: "not-done" })}
							>
								<p className="text-center text-sm font-semibold">Drag here to mark as NOT done</p>
							</div>
						</div>
					</div>

					<div className="col-span-4">
						<div className="flex flex-col gap-4">
							<h1 className="text-lg font-bold">People</h1>
							<div className="hidden grid-cols-4 gap-8 sm:grid md:grid-cols-2 xl:grid-cols-4">
								{personListQuery.isPending
									? repeat().map((i) => <ThingCardSkeleton key={i} />)
									: personListQuery.data.map((person) => (
											<PersonCard
												person={person}
												key={person.id}
												{...modeCtx.registerElement(`person-${person.id}`)}
												draggable
												onDragStart={(e) => assignmentDnd.handleDragStart(e, { sourceId: person.id })}
												isActive={modeCtx.getIsFocused(`person-${person.id}`)}
												onClick={() => handlePersonClick(person)}
												className={cn(
													"relative h-max w-max cursor-grab rounded-full outline-4 outline-transparent transition-all active:cursor-grabbing",
													modeCtx.getIsFocused(`person-${person.id}`) && "outline-ring",
												)}
											/>
										))}
							</div>
						</div>
					</div>
				</div>
			</PageContent>
		</>
	);
}
