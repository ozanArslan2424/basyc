import {
	useState,
	useEffect,
	useRef,
	useCallback,
	type Ref,
	createContext,
	type ReactNode,
	type Dispatch,
	type SetStateAction,
	use,
	type RefObject,
} from "react";
import { toast } from "sonner";

type El = HTMLDivElement;
type Mode = "normal" | "visual";

const ModeContext = createContext<{
	mode: Mode;
	setMode: Dispatch<SetStateAction<Mode>>;
	keysBuffer: string[];
	setKeysBuffer: Dispatch<SetStateAction<string[]>>;
	keyTimeoutRef: RefObject<NodeJS.Timeout | null>;
} | null>(null);

export function ModeProvider({ children }: { children: ReactNode }) {
	const [mode, setMode] = useState<Mode>("normal");
	const [keysBuffer, setKeysBuffer] = useState<string[]>([]);
	const keyTimeoutRef = useRef<NodeJS.Timeout>(null);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (keyTimeoutRef.current) clearTimeout(keyTimeoutRef.current);

			setKeysBuffer((prev) => [...prev, e.key]);
			toast(`code: ${e.code}, arr: ${keysBuffer.join(", ")}`);

			keyTimeoutRef.current = setTimeout(() => {
				setKeysBuffer([]);
			}, 500);
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [keysBuffer]);

	return <ModeContext value={{ mode, setMode, keysBuffer, setKeysBuffer, keyTimeoutRef }}>{children}</ModeContext>;
}

export function useModeContext() {
	const context = use(ModeContext);
	if (!context) throw new Error("useModeContext missing provider");
	return context;
}

export function useMode(els: { id: string; onAction: () => void }[] = []) {
	const { mode, setMode, keysBuffer, setKeysBuffer, keyTimeoutRef } = useModeContext();
	const [currentFocusIndex, setCurrentFocusIndex] = useState(0);
	const elementRefs = useRef<El[]>([]);

	const getEl = useCallback((id: string) => els.find((el) => el.id === id), [els]);

	useEffect(() => {
		elementRefs.current = elementRefs.current.slice(0, Object.keys(els).length);
	}, [els]);

	useEffect(() => {
		if (mode === "visual" && currentFocusIndex >= 0) {
			const currentElement = elementRefs.current[currentFocusIndex];
			if (currentElement) currentElement.focus();
		}
	}, [mode, currentFocusIndex]);

	const isValidSequence = useCallback(
		(...keys: string[]): boolean => {
			if (keysBuffer.length < keys.length) {
				return false;
			}

			const lastKeys = keysBuffer.slice(-keys.length);
			return lastKeys.every((key, index) => key === keys[index]);
		},
		[keysBuffer],
	);

	const isValidIndex = useCallback((index: number, collection: ArrayLike<unknown>): boolean => {
		if (isNaN(index)) return false;
		return Number.isInteger(index) && index >= 0 && index < collection.length;
	}, []);

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

	const handleKeySequence = useCallback(
		(e: KeyboardEvent) => {
			if (e.code === "Escape") {
				toast("cleared");
				setKeysBuffer([]);
				if (keyTimeoutRef.current) clearTimeout(keyTimeoutRef.current);
				return;
			}

			if (mode === "visual") {
				const index = parseInt(e.key);
				if (isValidIndex(index, els)) {
					setCurrentFocusIndex(index);
				}
				setKeysBuffer([]);
				if (keyTimeoutRef.current) clearTimeout(keyTimeoutRef.current);
				return;
			}

			if (isValidSequence(" ", "v")) {
				setMode("visual");
				setKeysBuffer([]);
				if (keyTimeoutRef.current) clearTimeout(keyTimeoutRef.current);
			}
		},
		[mode, els, isValidSequence, isValidIndex, setKeysBuffer, setMode, keyTimeoutRef],
	);

	const handleArrowNavigation = useCallback(
		(e: KeyboardEvent) => {
			const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Tab"];
			const isArrowKey = arrowKeys.includes(e.key);
			if (!isArrowKey) return;

			e.preventDefault();

			let newIndex = currentFocusIndex;
			const totalEls = elementRefs.current.length;

			const nextKeys = ["ArrowRight", "ArrowDown", "Tab"];
			const isNextKey = nextKeys.includes(e.key);
			if (isNextKey) {
				newIndex = (currentFocusIndex + 1) % totalEls;
				setCurrentFocusIndex(newIndex);
				return;
			}

			const prevKeys = ["ArrowLeft", "ArrowUp"];
			const isPrevKey = prevKeys.includes(e.key);
			if (isPrevKey) {
				newIndex = (currentFocusIndex - 1 + totalEls) % totalEls;
				setCurrentFocusIndex(newIndex);
				return;
			}
		},
		[currentFocusIndex],
	);

	const handleEnterKey = useCallback(
		(e: KeyboardEvent) => {
			const enterKeys = ["Enter", "Space"];
			const isEnterKey = enterKeys.includes(e.key);
			if (!isEnterKey) return;

			e.preventDefault();
			const currEl = elementRefs.current[currentFocusIndex];
			const elId = currEl?.id;
			if (!elId) return;

			const el = getEl(elId);
			if (!el || !el.onAction) return;

			el.onAction();
			setMode("normal");
		},
		[currentFocusIndex, getEl, setMode],
	);

	const handleEscapeKey = useCallback(
		(e: KeyboardEvent) => {
			const escapeKeys = ["Escape", "q"];
			const isEscapeKey = escapeKeys.includes(e.key);
			if (!isEscapeKey) return;

			setMode("normal");
		},
		[setMode],
	);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			handleKeySequence(e);
			if (mode === "visual") {
				handleArrowNavigation(e);
				handleEnterKey(e);
				handleEscapeKey(e);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [mode, handleKeySequence, handleArrowNavigation, handleEnterKey, handleEscapeKey]);

	return {
		mode,
		currentFocusIndex,
		registerElement,
		getIsFocused,
		elementRefs: elementRefs.current,
	};
}
