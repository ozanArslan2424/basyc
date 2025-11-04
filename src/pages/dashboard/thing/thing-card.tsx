import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PersonAvatar } from "@/components/user-avatar";
import type { ThingData } from "@/schemas/thing.schemas";
import type { ComponentProps } from "react";

type ThingCardProps = ComponentProps<"div"> & {
	thing: ThingData;
};

export function ThingCard({ thing, ...rest }: ThingCardProps) {
	return (
		<Card {...rest}>
			<CardContent className="flex gap-4">
				{thing.assignedTo ? (
					<PersonAvatar person={thing.assignedTo} />
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
	);
}

export function ThingCardSkeleton() {
	return (
		<Skeleton className="flex h-20 gap-4">
			<Skeleton className="aspect-square h-10 w-10 shrink-0 rounded-full" />
			<Skeleton className="h-5 w-full" />
		</Skeleton>
	);
}
