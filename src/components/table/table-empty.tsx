import { useTranslation } from "react-i18next";
import { TableCell, TableRow } from "../ui/table";

export function TableEmpty({ colSpan }: { colSpan: number }) {
	const { t } = useTranslation("common");

	return (
		<TableRow>
			<TableCell colSpan={colSpan} className="h-24 text-center">
				{t("noData")}
			</TableCell>
		</TableRow>
	);
}
