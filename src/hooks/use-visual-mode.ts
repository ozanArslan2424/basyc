import { useState, useEffect, useRef, useCallback, type Ref } from "react";

type El = HTMLDivElement;

// Custom hook for visual mode
export function useVisualMode(els: { id: string; onAction: () => void }[] = []) {
	const [isVisualMode, setIsVisualMode] = useState(false);
	const [currentFocusIndex, setCurrentFocusIndex] = useState(0);
	const keyPressBuffer = useRef<string[]>([]);
	const [lastKeyPressTime, setLastKeyPressTime] = useState(0);

	const elementRefs = useRef<El[]>([]);

	const getEl = useCallback((id: string) => els.find((el) => el.id === id), [els]);

	useEffect(() => {
		elementRefs.current = elementRefs.current.slice(0, Object.keys(els).length);
	}, [els]);

	// keyPressBuffer.current.length === 1 && keyPressBuffer.current[0] === "Space" && e.key === "v"
	// keyPressBuffer.current.length === 2 && keyPressBuffer.current[1] === "v" && e.key === "v"
	function checkKeys(e: KeyboardEvent, keys: string[]) {
		const currLen = keyPressBuffer.current.length;

		const currIdx = keys.length - 1;
		if (currIdx < 0) return false;
		const currExp = e.key;
		const currKey = keys[currIdx];

		const prevIdx = keys.length - 2;
		if (prevIdx < 0) return false;
		const prevExp = keyPressBuffer.current[prevIdx];
		const prevKey = keys[prevIdx];

		const result = currLen === currIdx && prevExp === prevKey && currExp === currKey;
		return result;
	}

	// Handle key sequence detection for "space + v + v"
	const handleKeySequence = useCallback(
		(e: KeyboardEvent) => {
			const currentTime = Date.now();

			if (e.code === "Space") {
				keyPressBuffer.current = ["Space"];
				setLastKeyPressTime(currentTime);
				return;
			}

			if (keyPressBuffer.current.length > 0 && currentTime - lastKeyPressTime > 500) {
				keyPressBuffer.current = [];
				return;
			}

			if (checkKeys(e, ["Space", "v"])) {
				keyPressBuffer.current = ["Space", "v"];
				setLastKeyPressTime(currentTime);
				return;
			}

			if (checkKeys(e, ["Space", "v", "v"])) {
				setIsVisualMode((prev) => !prev);
				keyPressBuffer.current = [];
				e.preventDefault();
				return;
			}

			keyPressBuffer.current = [];
		},
		[keyPressBuffer, lastKeyPressTime],
	);

	// Handle arrow key navigation in visual mode
	const handleArrowNavigation = useCallback(
		(e: KeyboardEvent) => {
			if (!isVisualMode) return;

			if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
				e.preventDefault();

				let newIndex = currentFocusIndex;
				const totalElements = elementRefs.current.length;

				switch (e.key) {
					case "ArrowRight":
					case "ArrowDown":
						newIndex = (currentFocusIndex + 1) % totalElements;
						break;
					case "ArrowLeft":
					case "ArrowUp":
						newIndex = (currentFocusIndex - 1 + totalElements) % totalElements;
						break;
					default:
						break;
				}

				setCurrentFocusIndex(newIndex);
			}
		},
		[isVisualMode, currentFocusIndex],
	);

	// Handle Enter key to open dialog
	const handleEnterKey = useCallback(
		(e: KeyboardEvent) => {
			if (!isVisualMode || e.key !== "Enter") return;
			e.preventDefault();
			const currEl = elementRefs.current[currentFocusIndex];
			const elId = currEl?.id;
			if (!elId) return;
			const el = getEl(elId);
			if (!el || !el.onAction) return;
			el.onAction();
			setIsVisualMode(false);
		},
		[isVisualMode, currentFocusIndex, getEl],
	);
	const handleEscapeKey = useCallback(
		(e: KeyboardEvent) => {
			const isEscapeKey = e.key === "Escape" || e.key === "q";
			if (isVisualMode && isEscapeKey) {
				setIsVisualMode(false);
			}
		},
		[isVisualMode],
	);

	// Main keyboard event handler
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			handleKeySequence(e);
			handleArrowNavigation(e);
			handleEnterKey(e);
			handleEscapeKey(e);
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [handleKeySequence, handleArrowNavigation, handleEnterKey, handleEscapeKey]);

	// Focus management
	useEffect(() => {
		if (isVisualMode && currentFocusIndex >= 0) {
			const currentElement = elementRefs.current[currentFocusIndex];
			if (currentElement) {
				currentElement.focus();
			}
		}
	}, [isVisualMode, currentFocusIndex]);

	// Register element ref
	const registerElement = useCallback(
		(
			id: string,
		): {
			ref: Ref<El>;
			id: string;
			tabIndex: number;
		} => ({
			ref: (element: El) => {
				elementRefs.current[els.findIndex((el) => el.id === id)] = element;
			},
			id,
			tabIndex: -1,
		}),
		[els],
	);

	const getIsFocused = useCallback(
		(id: string) => isVisualMode && currentFocusIndex === els.findIndex((el) => el.id === id),
		[isVisualMode, currentFocusIndex, els],
	);

	return {
		isVisualMode,
		currentFocusIndex,
		registerElement,
		getIsFocused,
		elementRefs: elementRefs.current,
	};
}
