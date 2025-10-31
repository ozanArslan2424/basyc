import { IconChevronsLeft, IconChevronLeft, IconChevronRight, IconChevronsRight } from "@tabler/icons-react";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

type PaginationProps = {
	currentLimit: number; // table.getState().pagination.pageSize
	onLimitChange: (limit: number) => void; // table.setPageSize
	selectedCount?: number; // table.getFilteredSelectedRowModel().rows.length
	totalCount?: number; // table.getFilteredRowModel().rows.length
	limitOptions?: number[];
	currentPage: number; // table.getState().pagination.pageIndex + 1
	totalPages: number; // table.getPageCount()
	onPageChange: (page: number) => void; // table.setPageIndex
};

export function Pagination(props: PaginationProps) {
	const { t } = useTranslation("common");
	const limitOptions = props.limitOptions || [10, 20, 30, 40, 50];
	return (
		<div className="flex items-center justify-between px-4">
			<div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
				{props.selectedCount && props.selectedCount > 0
					? `${props.selectedCount} of ${props.totalCount} satır
						seçildi.`
					: ""}
			</div>
			<div className="flex w-full items-center gap-8 lg:w-fit">
				<div className="hidden items-center gap-2 lg:flex">
					<Label htmlFor="rows-per-page" className="text-sm font-medium">
						{t("pagination.limit")}
					</Label>
					<Select value={props.currentLimit.toString()} onValueChange={(value) => props.onLimitChange(Number(value))}>
						<SelectTrigger size="sm" className="w-20" id="rows-per-page">
							<SelectValue placeholder={props.currentLimit} />
						</SelectTrigger>
						<SelectContent side="top">
							{limitOptions.map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex w-fit items-center justify-center text-sm font-medium">
					{t("pagination.page")} {props.currentPage} / {props.totalPages}
				</div>
				<div className="ml-auto flex items-center gap-2 lg:ml-0">
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() => props.onPageChange(0)}
						disabled={props.currentPage === 1}
					>
						<span className="sr-only">{t("pagination.firstPage")}</span>
						<IconChevronsLeft />
					</Button>
					<Button
						variant="outline"
						className="size-8"
						size="icon"
						onClick={() => props.onPageChange(props.currentPage - 1)}
						disabled={props.currentPage === 1}
					>
						<span className="sr-only">{t("pagination.prevPage")}</span>
						<IconChevronLeft />
					</Button>
					<Button
						variant="outline"
						className="size-8"
						size="icon"
						onClick={() => props.onPageChange(props.currentPage + 1)}
						disabled={props.currentPage === props.totalPages || props.totalPages === 0}
					>
						<span className="sr-only">{t("pagination.nextPage")}</span>
						<IconChevronRight />
					</Button>
					<Button
						variant="outline"
						className="hidden size-8 lg:flex"
						size="icon"
						onClick={() => props.onPageChange(props.totalPages - 1)}
						disabled={props.currentPage === props.totalPages || props.totalPages === 0}
					>
						<span className="sr-only">{t("pagination.lastPage")}</span>
						<IconChevronsRight />
					</Button>
				</div>
			</div>
		</div>
	);
}
