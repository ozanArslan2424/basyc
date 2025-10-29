import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useTranslation } from "react-i18next";

type SearchBarProps = {
	value: string | null;
	onChange: (value: string) => void;
	placeholder?: string;
};

export function SearchBar(props: SearchBarProps) {
	const { t } = useTranslation("common");
	const searchPlaceholder = t("searchPlaceholder");
	return (
		<div className="relative h-max flex-1">
			<SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
			<Input
				placeholder={props.placeholder ?? searchPlaceholder}
				className="pl-9"
				value={props.value ?? ""}
				onChange={(e) => props.onChange(e.target.value)}
			/>
		</div>
	);
}
