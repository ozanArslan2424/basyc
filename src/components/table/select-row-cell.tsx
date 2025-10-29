import type { Row } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";

export function TableSelectAllCell<T>(row: Row<T>) {
	return (
		<div className="flex items-center justify-center">
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Satırı seç"
			/>
		</div>
	);
}
