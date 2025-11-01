import { useAppContext } from "@/client";
import { PageContent } from "@/components/page-content";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useActiveEntity } from "@/hooks/use-active-entity";
import { useDialog } from "@/hooks/use-dialog";
import { useDnd } from "@/hooks/use-dnd";
import { useVisualMode } from "@/hooks/use-visual-mode";
import { cn, repeat } from "@/lib/utils";
import { PersonCard } from "@/pages/dashboard/person-card";
import { ThingCard, ThingCardSkeleton } from "@/pages/dashboard/thing-card";
import { ThingForm } from "@/pages/dashboard/thing-form";
import { ErrorCard } from "@/pages/error/error-card";
import type { ThingData } from "@/schemas/thing.schemas";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
	Command,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandSeparator,
	CommandDialog,
} from "@/components/ui/command";
import type { Person } from "prisma/generated";
import { useCallback, useEffect, useMemo, useRef, useState, type ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
import { ConfirmDialog } from "@/components/dialogs/confirm-dialog";

type ThingActionDialogProps = ComponentProps<typeof Dialog> & {
	activeThing: ThingData | null;
	onSelectThingAction: (key: string) => void;
};

export function ThingActionDialog({ activeThing, onSelectThingAction, ...rest }: ThingActionDialogProps) {
	const actions = [
		{ key: "update", label: "Update content" },
		{ key: "assign", label: "Assign to someone" },
		{ key: "delete", label: "Delete" },
	];

	if (!activeThing) return;
	return (
		<CommandDialog {...rest}>
			<Command className="rounded-lg border shadow-md md:min-w-[450px]">
				<CommandInput placeholder="Search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Actions">
						{actions.map((action) => (
							<CommandItem key={action.key} value={action.key} onSelect={onSelectThingAction}>
								<span>{action.label}</span>
							</CommandItem>
						))}

						<CommandSeparator />
						<CommandItem value="close" onSelect={onSelectThingAction}>
							<span>Close</span>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</CommandDialog>
	);
}

export function DashboardPage() {
	const ctx = useAppContext();
	const { t } = useTranslation("common");

	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	const thingListQuery = useQuery(ctx.thingService.queryList());
	const personListQuery = useQuery(ctx.personService.queryList());
	const thingAssignMutation = useMutation(ctx.thingService.assign());

	const activeThing = useActiveEntity<ThingData>();
	const activePerson = useActiveEntity<Person>();

	const thingActionDialog = useDialog();
	const personActionDialog = useDialog();

	const thingDeleteDialog = useConfirmDialog(() => toast("deleetttteteeee"));

	const els = [
		{
			id: "form",
			onAction: () => {
				textareaRef.current?.focus();
			},
		},
		...(thingListQuery.data ?? []).map((t) => ({
			id: `thing-${t.id}`,
			onAction: () => {
				activeThing.set(t);
				thingActionDialog.onOpenChange(true);
			},
		})),
		...(personListQuery.data ?? []).map((p) => ({
			id: `person-${p.id}`,
			onAction: () => {
				activePerson.set(p);
				personActionDialog.onOpenChange(true);
			},
		})),
	];

	const vm = useVisualMode(els);

	const thingDnd = useDnd({
		onDrop: (sourceData, targetData) => {
			const personId = Number(sourceData.sourceId);
			const thingId = Number(targetData.targetId);
			thingAssignMutation.mutate({ thingId, personId });
		},
	});

	function handleSelectThingAction(key: string) {
		toast(key);
		switch (key) {
			case "update":
				break;
			case "assign":
				break;
			case "delete":
				thingActionDialog.onOpenChange(false);
				thingDeleteDialog.onOpenChange(true);
				break;
			case "close":
			default:
				thingActionDialog.onOpenChange(false);
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
				activeThing={activeThing.entity}
				onSelectThingAction={handleSelectThingAction}
				{...thingActionDialog}
			/>
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
									vm.getIsFocused("form") && "outline-ring",
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
													vm.getIsFocused(`thing-${thing.id}`) && "outline-ring",
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
												vm.getIsFocused(`person-${person.id}`) && "outline-ring",
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
