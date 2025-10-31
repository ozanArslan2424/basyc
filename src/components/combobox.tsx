import * as React from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from "react-i18next";

type Option = { value: string; label: string };

type ComboboxProps = {
	id?: string;
	name?: string;
	placeholder?: string;
	searchPlaceholder?: string;
	value?: string | null;
	onValueChange?: (value: string | null) => void;
	onCreateOption?: (option: Option) => void;
	options: Option[];
};

export function Combobox({
	id,
	name,
	placeholder,
	searchPlaceholder,
	value,
	onValueChange,
	onCreateOption,
	options,
}: ComboboxProps) {
	const [open, setOpen] = React.useState(false);
	const [inputValue, setInputValue] = React.useState("");
	const [internalOptions, setInternalOptions] = React.useState(options);
	const isMobile = useIsMobile();
	const [internalValue, setInternalValue] = React.useState<Option | null>(
		options.find((opt) => opt.value === value) || null,
	);

	function handleSelect(selectedValue: string) {
		if (selectedValue === "___") {
			setInternalValue(null);
			onValueChange?.(null);
			setOpen(false);
			return;
		}

		const selectedOption = internalOptions.find((opt) => opt.value === selectedValue);
		if (selectedOption) {
			setInternalValue(selectedOption);
			onValueChange?.(selectedOption.value);
			setOpen(false);
		}
	}

	function handleCreateOption(label: string) {
		const newOption = { value: label.toLowerCase().replace(/\s+/g, "-"), label };
		setInternalOptions((prev) => [...prev, newOption]);
		setInternalValue(newOption);
		onCreateOption?.(newOption);
		onValueChange?.(newOption.value);
		setOpen(false);
	}

	const filteredOptions = internalOptions.filter((opt) => opt.label.toLowerCase().includes(inputValue.toLowerCase()));

	if (isMobile) {
		return (
			<>
				<input type="hidden" id={id} name={name} value={internalValue?.value || ""} />

				<Drawer open={open} onOpenChange={setOpen}>
					<DrawerTrigger asChild>
						<Button variant="outline" className="w-full justify-start">
							{internalValue ? internalValue.label : placeholder}
						</Button>
					</DrawerTrigger>
					<DrawerContent>
						<div className="mt-4 border-t">
							<RenderCommand
								searchPlaceholder={searchPlaceholder}
								inputValue={inputValue}
								setInputValue={setInputValue}
								filteredOptions={filteredOptions}
								handleSelect={handleSelect}
								handleCreateOption={handleCreateOption}
							/>
						</div>
					</DrawerContent>
				</Drawer>
			</>
		);
	}

	return (
		<>
			<input type="hidden" id={id} name={name} value={internalValue?.value || ""} />

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" className="w-full justify-start">
						{internalValue ? internalValue.label : placeholder}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-full p-0" align="start">
					<RenderCommand
						searchPlaceholder={searchPlaceholder}
						inputValue={inputValue}
						setInputValue={setInputValue}
						filteredOptions={filteredOptions}
						handleSelect={handleSelect}
						handleCreateOption={handleCreateOption}
					/>
				</PopoverContent>
			</Popover>
		</>
	);
}

function RenderCommand({
	searchPlaceholder,
	inputValue,
	setInputValue,
	filteredOptions,
	handleSelect,
	handleCreateOption,
}: {
	searchPlaceholder?: string;
	inputValue: string;
	setInputValue: (value: string) => void;
	filteredOptions: Option[];
	handleSelect: (value: string) => void;
	handleCreateOption: (label: string) => void;
}) {
	const { t } = useTranslation("common");
	return (
		<Command>
			<CommandInput
				placeholder={searchPlaceholder || t("searchPlaceholder")}
				value={inputValue}
				onValueChange={setInputValue}
			/>
			<CommandList>
				<CommandGroup>
					<CommandItem className="text-muted-foreground" value="___" onSelect={handleSelect}>
						{t("clear")}
					</CommandItem>
					{filteredOptions.map((opt) => (
						<CommandItem key={opt.value} value={opt.value} onSelect={handleSelect}>
							{opt.label}
						</CommandItem>
					))}
					{inputValue && !filteredOptions.some((opt) => opt.label.toLowerCase() === inputValue.toLowerCase()) && (
						<CommandItem value={`__create__${inputValue}`} onSelect={() => handleCreateOption(inputValue)}>
							{t("create")} "{inputValue}"
						</CommandItem>
					)}
				</CommandGroup>
			</CommandList>
		</Command>
	);
}
