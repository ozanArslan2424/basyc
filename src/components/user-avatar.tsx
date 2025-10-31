import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import type { TBasePerson } from "@/lib/base.type";

export function UserAvatar<T extends TBasePerson>({ user, className }: { user: T; className?: string }) {
	const initials = user.name
		.split(" ")
		.map((p) => p[0])
		.join("");

	return (
		<Avatar className={cn("h-8 w-8 rounded-full", className)}>
			<AvatarImage src={user.image ?? undefined} alt={user.name} />
			<AvatarFallback className="pointer-events-none rounded-lg no-underline select-none">{initials}</AvatarFallback>
		</Avatar>
	);
}
