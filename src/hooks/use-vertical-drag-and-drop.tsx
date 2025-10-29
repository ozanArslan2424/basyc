import type { TWithId } from "@/lib/helper.type";
import {
	useSensors,
	useSensor,
	MouseSensor,
	TouchSensor,
	KeyboardSensor,
	type UniqueIdentifier,
	closestCenter,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";
import React from "react";

export function useVerticalDragAndDrop<T extends TWithId>(data: T[]) {
	const sortableId = React.useId();
	const sensors = useSensors(
		useSensor(MouseSensor, {}),
		useSensor(TouchSensor, {}),
		useSensor(KeyboardSensor, {}),
	);
	const dataIds = React.useMemo<UniqueIdentifier[]>(() => data?.map(({ id }) => id) || [], [data]);

	return {
		dndContextProps: {
			collisionDetection: closestCenter,
			modifiers: [restrictToVerticalAxis],
			sensors,
			id: sortableId,
		},
		sortableContextProps: {
			items: dataIds,
			strategy: verticalListSortingStrategy,
		},
		sortableId,
		sensors,
		dataIds,
	};
}
