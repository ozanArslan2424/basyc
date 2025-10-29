import type { Table } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";

export function TableSelectAllCell<T>(table: Table<T>) {
	return (
		<div className="flex items-center justify-center">
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Hepsini seç"
			/>
		</div>
	);
}
