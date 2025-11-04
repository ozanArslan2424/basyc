import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import type { TBasePerson } from "@/lib/base.type";

export function PersonAvatar<T extends TBasePerson>({ person, className }: { person: T; className?: string }) {
	const initials = person.name
		.split(" ")
		.map((p) => p[0])
		.join("");

	return (
		<Avatar className={cn("h-10 w-10 rounded-full", className)}>
			<AvatarImage src={person.image ?? undefined} alt={person.name} />
			<AvatarFallback className="pointer-events-none rounded-lg no-underline select-none">{initials}</AvatarFallback>
		</Avatar>
	);
}
