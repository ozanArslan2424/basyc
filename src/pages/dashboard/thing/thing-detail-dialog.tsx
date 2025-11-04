import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PersonAvatar } from "@/components/user-avatar";
import { timestamp } from "@/lib/time.utils";
import { cn } from "@/lib/utils";
import type { ThingData } from "@/schemas/thing.schemas";
import { CheckIcon, TargetIcon } from "lucide-react";
import type { ComponentProps } from "react";

type ThingDetailDialogProps = ComponentProps<typeof Dialog> & {
	thing: ThingData | null;
};

export function ThingDetailDialog({ thing, ...rest }: ThingDetailDialogProps) {
	if (!thing) return;

	return (
		<Dialog {...rest}>
			<DialogContent>
				<DialogHeader className="sr-only">
					<DialogTitle>Thing detail dialog for thing id: ${thing.id}</DialogTitle>
					<DialogDescription>This is the detail dialog for a thing.</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-4">
						<div className="ring-border flex aspect-square h-10 w-10 items-center justify-center rounded-full ring">
							<span className="text-lg font-black">ID</span>
						</div>
						<p className="text-foreground leading-0 font-bold">{thing.id}</p>
					</div>

					{thing.dueDate && (
						<div className={cn("flex items-center gap-4", thing.isDone && "opacity-50")}>
							<div className="ring-border flex aspect-square h-10 w-10 items-center justify-center rounded-full ring">
								<span className="text-lg font-black">!!</span>
							</div>
							<p className="text-foreground leading-0 font-bold">
								This thing is due {timestamp(thing.dueDate).dateTimeShort}
							</p>
						</div>
					)}

					{thing.isDone && thing.doneDate && (
						<div className="flex items-center gap-4">
							<div className="ring-border flex aspect-square h-10 w-10 items-center justify-center rounded-full ring">
								<span className="text-lg font-black">
									<CheckIcon className="text-success size-6" />
								</span>
							</div>
							<p className="text-foreground leading-0 font-bold">Done! {timestamp(thing.doneDate).ordinalDateTime}</p>
						</div>
					)}

					<div className="flex items-center gap-4">
						{thing.assignedTo ? (
							<PersonAvatar person={thing.assignedTo} />
						) : (
							<div className="ring-border flex aspect-square h-10 w-10 items-center justify-center rounded-full ring">
								<span className="text-xl font-black">?</span>
							</div>
						)}
						<p className="text-foreground leading-0 font-bold">
							{thing.assignedTo ? thing.assignedTo.name : "Nobody"} is assigned to this thing.
						</p>
					</div>

					<div className="flex items-center gap-4">
						<div className="ring-border flex aspect-square h-10 w-10 items-center justify-center rounded-full ring">
							<span className="text-lg font-black">
								<TargetIcon className="size-6" />
							</span>
						</div>
						<p className="text-foreground leading-0 font-bold">{thing.content}</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
