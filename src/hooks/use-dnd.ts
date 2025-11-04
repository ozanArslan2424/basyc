import { useCallback, useState, type DragEvent } from "react";

type Id = string | number;

type UseDndOptions<S, T> = {
	onDrop: (sourceData: S, targetData: T) => void;
	format?: string;
	dropEffect?: "move" | "none" | "copy" | "link";
};

export type UseDndReturn<S, T> = {
	handleDragStart: (e: DragEvent<HTMLElement>, sourceData: S) => void;
	handleDragOver: (e: DragEvent<HTMLElement>, overId: Id) => void;
	handleDrop: (e: DragEvent<HTMLElement>, targetData: T) => void;
	getIsDragged: (id: Id) => boolean;
	getIsOver: (id: Id) => boolean;
};

type SDataBase = { sourceId: Id };
type TDataBase = { targetId: Id };

export function useDnd<S extends SDataBase = SDataBase, T extends TDataBase = TDataBase>({
	onDrop,
	format = "application/json",
	dropEffect = "move",
}: UseDndOptions<S, T>): UseDndReturn<S, T> {
	const [sourceId, setSourceId] = useState<Id | null>(null);
	const [targetId, setTargetId] = useState<Id | null>(null);

	const handleDragStart = useCallback(
		(e: DragEvent<HTMLElement>, sourceData: S) => {
			e.dataTransfer.setData(format, JSON.stringify(sourceData));
			setSourceId(sourceData.sourceId);
		},
		[format],
	);

	const handleDragOver = useCallback(
		(e: DragEvent<HTMLElement>, overId: Id) => {
			e.preventDefault();
			e.dataTransfer.dropEffect = dropEffect;
			setTargetId(overId);
		},
		[dropEffect],
	);

	const handleDrop = useCallback(
		(e: DragEvent<HTMLElement>, targetData: T) => {
			e.preventDefault();
			const transferData = e.dataTransfer.getData(format);
			setSourceId(null);
			setTargetId(null);
			try {
				const sourceData = JSON.parse(transferData);
				onDrop(sourceData, targetData);
			} catch (err) {
				console.log("DND DATA JSON ERROR:", err);
			}
		},
		[onDrop, format],
	);

	const getIsOver = useCallback(
		(id: Id) => {
			if (!targetId) return false;
			return targetId.toString() === id.toString();
		},
		[targetId],
	);

	const getIsDragged = useCallback(
		(id: Id) => {
			if (!sourceId) return false;
			return sourceId.toString() === id.toString();
		},
		[sourceId],
	);

	return {
		handleDragStart,
		handleDragOver,
		handleDrop,
		getIsOver,
		getIsDragged,
	};
}
