import { cn } from "@/lib/utils";
import { Chip } from "@/components/ui/chip";
import { Phone } from "lucide-react";
import countries from "@/lib/countries.json";

interface PhoneLinkProps {
	phone: string;
	className?: string;
	showFlag?: boolean;
}

export function PhoneLink({ phone, className, showFlag = false }: PhoneLinkProps) {
	const cleanPhone = phone.replace(/\D/g, "");

	if (!cleanPhone) return null;

	const formatPhoneNumber = (num: string) => {
		if (num.startsWith("90")) {
			return `+${num}`;
		}
		if (num.startsWith("0")) {
			return `+9${num.slice(1)}`;
		}
		return `+${num}`;
	};

	const getFlagEmoji = (phone: string) => {
		const country = countries.find((country) =>
			country.dialCode ? phone.startsWith(country.dialCode) : undefined,
		);
		return country?.emoji || "🌐";
	};

	const formattedPhone = formatPhoneNumber(cleanPhone);
	const flagEmoji = getFlagEmoji(formattedPhone);
	const telLink = `tel:${formattedPhone}`;

	return (
		<Chip
			variant="outline"
			className={cn(
				"hover:bg-accent/50 inline-flex cursor-pointer items-center gap-2 px-3 py-1 transition-colors",
				className,
			)}
			asChild
		>
			<a href={telLink} onClick={(e) => e.stopPropagation()}>
				{showFlag ? <span className="text-xs">{flagEmoji}</span> : <Phone className="h-3 w-3" />}
				<span className="text-xs font-medium">{formattedPhone}</span>
			</a>
		</Chip>
	);
}
