import { type DragEvent } from "react";

interface UseDndOptions<S, T> {
	onDrop: (sourceData: S, targetData: T) => void;
	format?: string;
	dropEffect?: "move" | "none" | "copy" | "link";
}

interface UseDndReturn<S, T> {
	handleDragStart: (e: DragEvent<HTMLElement>, sourceData: S) => void;
	handleDragOver: (e: DragEvent<HTMLElement>) => void;
	handleDrop: (e: DragEvent<HTMLElement>, targetData: T) => void;
}

type SDataBase = { sourceId: string | number };
type TDataBase = { targetId: string | number };

export function useDnd<S extends SDataBase = SDataBase, T extends TDataBase = TDataBase>({
	onDrop,
	format = "application/json",
	dropEffect = "move",
}: UseDndOptions<S, T>): UseDndReturn<S, T> {
	function handleDragStart(e: DragEvent<HTMLElement>, sourceData: S) {
		e.dataTransfer.setData(format, JSON.stringify(sourceData));
	}

	function handleDragOver(e: DragEvent<HTMLElement>) {
		e.preventDefault();
		e.dataTransfer.dropEffect = dropEffect;
	}

	function handleDrop(e: DragEvent<HTMLElement>, targetData: T) {
		e.preventDefault();
		const transferData = e.dataTransfer.getData(format);
		try {
			const sourceData = JSON.parse(transferData);
			onDrop(sourceData, targetData);
		} catch (err) {
			console.log("DND DATA JSON ERROR:", err);
		}
	}

	return {
		handleDragStart,
		handleDragOver,
		handleDrop,
	};
}
