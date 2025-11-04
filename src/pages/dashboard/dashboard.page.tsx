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
import { ThingActionDialog } from "@/pages/dashboard/thing/thing-action-dialog";
import { ThingUpdateDialog } from "@/pages/dashboard/thing/thing-update-dialog";

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
	const thingDeleteMutation = useMutation(ctx.thingService.delete());
	const thingActive = useActiveEntity<ThingData>();
	const thingActionDialog = useDialog();
	const thingUpdateDialog = useDialog();
	const thingDeleteDialog = useConfirmDialog(() => {
		if (!thingActive.entity) {
			toast.error("Nothing selected!");
			return;
		}
		thingDeleteMutation.mutate({ thingId: thingActive.entity.id });
		thingActive.set(null);
	});
	const thingDnd = useDnd({
		onDrop: (sourceData, targetData) => {
			const personId = Number(sourceData.sourceId);
			const thingId = Number(targetData.targetId);
			thingAssignMutation.mutate({ thingId, personId });
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

	function handleSelectThingAction(key: string) {
		switch (key) {
			case "update":
				thingUpdateDialog.onOpenChange(true);
				break;
			case "assign":
				break;
			case "delete":
				thingDeleteDialog.onOpenChange(true);
				break;
			case "close":
			default:
				break;
		}
	}

	const browserTitle = t("app.name");
	const error = thingListQuery.error || personListQuery.error;

	if (error) {
		return <ErrorCard error={error} />;
	}

	return (
		<>
			<ThingActionDialog
				activeThing={thingActive.entity}
				onSelectThingAction={handleSelectThingAction}
				{...thingActionDialog}
			/>
			<ThingUpdateDialog thing={thingActive.entity} {...thingUpdateDialog} />
			<ConfirmDialog
				title="You are about to delete this thing."
				description="Once a thing is deleted, it stays deleted. Are you sure?"
				{...thingDeleteDialog}
			/>

			<PageContent browserTitle={browserTitle}>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-12">
					<div className="col-span-4 md:col-span-8">
						<div className="flex flex-col gap-4 lg:flex-row">
							<ThingForm
								textareaRef={textareaRef}
								className={cn(
									"outline-2 outline-transparent transition-all",
									"flex h-max flex-1 flex-col gap-4",
									modeCtx.getIsFocused("form") && "outline-ring",
								)}
								{...modeCtx.registerElement("form")}
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
												{...modeCtx.registerElement(`thing-${thing.id}`)}
												className={cn(
													"outline-2 outline-transparent transition-all",
													modeCtx.getIsFocused(`thing-${thing.id}`) && "outline-ring",
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
											{...modeCtx.registerElement(`person-${person.id}`)}
											draggable
											onDragStart={(e) => thingDnd.handleDragStart(e, { sourceId: person.id })}
											isActive={modeCtx.getIsFocused(`person-${person.id}`)}
											className={cn(
												"relative h-max w-max cursor-grab rounded-full outline-4 outline-transparent transition-all active:cursor-grabbing",
												modeCtx.getIsFocused(`person-${person.id}`) && "outline-ring",
											)}
										/>
									))}
						</div>
					</div>
				</div>
			</PageContent>
		</>
	);
}
