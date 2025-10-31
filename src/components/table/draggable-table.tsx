import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { flexRender, type Table as TableType } from "@tanstack/react-table";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DraggableRow } from "@/components/table/draggable-row";
import { useVerticalDragAndDrop } from "@/hooks/use-vertical-drag-and-drop";
import { TableEmpty } from "@/components/table/table-empty";
import type { TWithId } from "@/lib/helper.type";

type DraggableTableProps<T extends TWithId> = {
	table: TableType<T>;
	onDragEnd: (items: T[]) => void;
	items: T[];
};

export function DraggableTable<T extends TWithId>({ table, onDragEnd, items }: DraggableTableProps<T>) {
	const verticalDnd = useVerticalDragAndDrop(items);

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (active && over && active.id !== over.id) {
			const from = verticalDnd.dataIds.indexOf(active.id);
			const to = verticalDnd.dataIds.indexOf(over.id);
			onDragEnd(arrayMove(items, from, to));
		}
	}

	return (
		<DndContext {...verticalDnd.dndContextProps} onDragEnd={handleDragEnd}>
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
						<SortableContext {...verticalDnd.sortableContextProps}>
							{table.getRowModel().rows.map((row) => (
								<DraggableRow key={row.id} row={row} />
							))}
						</SortableContext>
					) : (
						<TableEmpty colSpan={table.getAllColumns().length} />
					)}
				</TableBody>
			</Table>
		</DndContext>
	);
}
