import { flexRender, type Table as TableType } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableEmpty } from "@/components/table/table-empty";
import type { TWithId } from "@/lib/helper.type";

type DefaultTableProps<T extends TWithId> = {
	table: TableType<T>;
};

export function DefaultTable<T extends TWithId>({ table }: DefaultTableProps<T>) {
	return (
		<Table>
			<TableHeader className="bg-muted sticky top-0 z-10">
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<TableHead key={header.id} colSpan={header.colSpan}>
								{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
							</TableHead>
						))}
					</TableRow>
				))}
			</TableHeader>
			<TableBody className="**:data-[slot=table-cell]:first:w-8">
				{table.getRowModel().rows?.length ? (
					table.getRowModel().rows.map((row) => (
						<TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="relative z-0">
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
							))}
						</TableRow>
					))
				) : (
					<TableEmpty colSpan={table.getAllColumns().length} />
				)}
			</TableBody>
		</Table>
	);
}
