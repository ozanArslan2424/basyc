import { useState, useEffect, useRef, useCallback, type Ref, createContext, type ReactNode, use } from "react";

type El = HTMLDivElement;
type Mode = "normal" | "visual" | "action";

function useMode() {
	const [els, setEls] = useState<{ id: string; onAction: () => void }[]>([]);
	const [mode, setMode] = useState<Mode>("normal");
	const [keysBuffer, setKeysBuffer] = useState<string[]>([]);
	const [currentFocusIndex, setCurrentFocusIndex] = useState(0);

	const keyTimeoutRef = useRef<NodeJS.Timeout>(null);
	const elementRefs = useRef<El[]>([]);
	const leaderClicked = useRef<boolean>(false);

	const getEl = useCallback((id: string) => els.find((el) => el.id === id), [els]);

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
		(id: string) => mode !== "normal" && currentFocusIndex === els.findIndex((el) => el.id === id),
		[mode, currentFocusIndex, els],
	);

	useEffect(() => {
		const isValidIndex = (index: number, collection: ArrayLike<unknown>): boolean => {
			if (isNaN(index)) return false;
			return Number.isInteger(index) && index >= 0 && index < collection.length;
		};

		const handleNavigation = (e: KeyboardEvent) => {
			const isArrowKey = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key);
			const isIndexKey = isValidIndex(parseInt(e.key), els);

			if (isArrowKey) {
				e.preventDefault();

				let newIndex = currentFocusIndex;
				const totalEls = elementRefs.current.length;

				if (["ArrowRight", "ArrowDown", "Tab"].includes(e.key)) {
					newIndex = (currentFocusIndex + 1) % totalEls;
					setCurrentFocusIndex(newIndex);
					return;
				}

				if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
					newIndex = (currentFocusIndex - 1 + totalEls) % totalEls;
					setCurrentFocusIndex(newIndex);
					return;
				}
				return;
			} else if (isIndexKey) {
				setCurrentFocusIndex(parseInt(e.key));
			}
		};

		const handleEnterKey = (e: KeyboardEvent) => {
			const enterKeys = ["Enter", "Space"];
			const isEnterKey = enterKeys.includes(e.key);
			if (!isEnterKey) return;

			e.preventDefault();
			const currEl = elementRefs.current[currentFocusIndex];
			const elId = currEl?.id;
			if (!elId) return;

			const el = getEl(elId);
			if (!el || !el.onAction) return;

			setMode("action");
			el.onAction();
		};

		const handleEscapeKey = (e: KeyboardEvent) => {
			const escapeKeys = ["Escape", "KeyQ"];
			const isEscapeKey = escapeKeys.includes(e.code);
			if (!isEscapeKey) return;

			setMode("normal");
		};

		const reset = () => {
			setKeysBuffer([]);
			leaderClicked.current = false;
		};

		const handleKey = (e: KeyboardEvent) => {
			if (mode === "normal" && e.code === "Space") {
				leaderClicked.current = true;
			}

			setKeysBuffer((prev) => [...prev, e.code]);

			keyTimeoutRef.current = setTimeout(() => {
				reset();
			}, 500);
		};

		const handleKeySequence = (e: KeyboardEvent) => {
			if (keyTimeoutRef.current) clearTimeout(keyTimeoutRef.current);

			if (mode !== "normal" && e.code === "Escape") {
				reset();
				return;
			}

			if (!leaderClicked.current) {
				handleKey(e);
				return;
			}

			switch (e.code) {
				case "KeyV":
					setMode("visual");
					reset();
					break;

				default:
					handleKey(e);
					break;
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			if (mode !== "normal") {
				handleEscapeKey(e);
			}
			if (mode !== "action") {
				handleKeySequence(e);
				if (mode === "visual") {
					handleNavigation(e);
					handleEnterKey(e);
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [keysBuffer, mode, els, getEl, currentFocusIndex]);

	useEffect(() => {
		elementRefs.current = elementRefs.current.slice(0, Object.keys(els).length);
	}, [els]);

	useEffect(() => {
		if (mode === "visual" && currentFocusIndex >= 0) {
			const currentElement = elementRefs.current[currentFocusIndex];
			if (currentElement) currentElement.focus();
		}
	}, [mode, currentFocusIndex]);

	return {
		mode,
		setMode,
		keysBuffer,
		setKeysBuffer,
		keyTimeoutRef,
		currentFocusIndex,
		registerElement,
		getIsFocused,
		elementRefs: elementRefs.current,
		els,
		setEls,
	};
}

const ModeContext = createContext<ReturnType<typeof useMode> | null>(null);

export function ModeProvider({ children }: { children: ReactNode }) {
	const value = useMode();

	return <ModeContext value={value}>{children}</ModeContext>;
}

export function useModeContext() {
	const context = use(ModeContext);
	if (!context) throw new Error("useModeContext missing provider");
	return context;
}
