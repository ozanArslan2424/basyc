import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { timestamp } from "@/lib/time.utils";

interface DateTimePickerProps {
	id?: string;
	name?: string;
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
}

export function DateTimePicker({ id, name, value, defaultValue, onChange }: DateTimePickerProps) {
	const [open, setOpen] = React.useState(false);
	const [dateValue, setDateValue] = React.useState(
		value ? new Date(value) : defaultValue ? new Date(defaultValue) : undefined,
	);

	const getTimeFromDate = (date: Date) => date.toTimeString().slice(0, 5); // HH:MM format

	const handleDateSelect = (selectedDate: Date | undefined) => {
		if (!selectedDate) return;

		const currentTime = dateValue ? getTimeFromDate(dateValue) : "00:00";
		const newDateTime = new Date(selectedDate);
		const [hours, minutes] = currentTime.split(":");
		newDateTime.setHours(Number(hours), Number(minutes));

		if (onChange) {
			onChange(newDateTime.toISOString());
		}

		setDateValue(newDateTime);
		setOpen(false);
	};

	const handleTimeChange = (timeString: string) => {
		const baseDate = dateValue || new Date();
		const newDateTime = new Date(baseDate);
		const [hours, minutes] = timeString.split(":");
		newDateTime.setHours(Number(hours), Number(minutes));

		if (onChange) {
			onChange(newDateTime.toISOString());
		}

		setDateValue(newDateTime);
	};

	return (
		<div className="grid grid-cols-3 gap-4">
			<div className="col-span-2 w-full">
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button variant="outline" className="w-full justify-between font-normal">
							{dateValue ? timestamp(dateValue).shortDate : ". . / . . / . . . ."}
							<ChevronDownIcon />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto overflow-hidden p-0" align="start">
						<Calendar
							mode="single"
							selected={dateValue}
							captionLayout="dropdown"
							onSelect={handleDateSelect}
						/>
					</PopoverContent>
				</Popover>
			</div>
			<div className="col-span-1 w-full">
				<Input
					type="time"
					step="60"
					value={dateValue ? getTimeFromDate(dateValue) : ""}
					onChange={(e) => handleTimeChange(e.target.value)}
					className="bg-background w-full appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
				/>
			</div>
			<input type="hidden" id={id} name={name} value={dateValue?.toISOString()} />
		</div>
	);
}
