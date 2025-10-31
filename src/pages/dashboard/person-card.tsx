import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { Person } from "prisma/generated";
import type { ComponentProps } from "react";

type PersonCardProps = ComponentProps<"div"> & {
	person: Person;
	isActive?: boolean;
};

export function PersonCard({ person, isActive, ...rest }: PersonCardProps) {
	return (
		<div {...rest}>
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
					isActive && "before:pointer-events-none before:absolute before:inset-0 before:bg-green-500 before:opacity-20",
				)}
			>
				{person.name}
			</span>
		</div>
	);
}

export function PersonCardSkeleton() {
	return (
		<Skeleton className="relative h-max w-max cursor-grab rounded-full active:cursor-grabbing">
			<Skeleton
				className={cn(
					"bg-background aspect-square rounded-full border shadow-xs select-none",
					"xl:h-24 xl:w-24",
					"lg:h-20 lg:w-20",
					"md:h-16 md:w-16",
					"sm:h-24 sm:w-24",
					"h-24 w-24",
				)}
			/>
			<Skeleton
				className={cn(
					"bg-background absolute left-1/2 w-max -translate-x-1/2 overflow-hidden rounded-md border px-2 py-1 font-bold whitespace-nowrap shadow-sm select-none",
					"xl:bottom-0 xl:text-sm",
					"lg:-bottom-2 lg:text-xs",
					"md:-bottom-2 md:text-xs",
					"sm:bottom-0 sm:text-xs",
					"bottom-0 text-xs",
				)}
			></Skeleton>
		</Skeleton>
	);
}
