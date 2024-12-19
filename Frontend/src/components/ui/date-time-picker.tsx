"use client";

import { add, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Matcher } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { TimePickerDemo } from "./time-picker-demo";

export function DateTimePicker({
	date,
	setDate,
	disabled,
}: {
	date: Date | undefined;
	setDate: (date: Date | undefined) => void;
	disabled?: Matcher[];
}) {
	/**
	 * carry over the current time when a user clicks a new day
	 * instead of resetting to 00:00
	 */
	const handleSelect = (newDay: Date | undefined) => {
		if (!newDay) return;
		if (!date) {
			setDate(newDay);
			return;
		}
		const diff = newDay.getTime() - date.getTime();
		const diffInDays = diff / (1000 * 60 * 60 * 24);
		const newDateFull = add(date, { days: Math.ceil(diffInDays) });
		setDate(newDateFull);
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-full justify-start text-left font-normal",
						!date && "text-muted-foreground",
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? (
						format(date, "PPP HH:mm:ss")
					) : (
						<span>Pick a date</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={date}
					onSelect={(d) => handleSelect(d)}
					disabled={disabled}
					initialFocus
				/>
				<div className="p-3 border-t border-border">
					<TimePickerDemo setDate={setDate} date={date} />
				</div>
			</PopoverContent>
		</Popover>
	);
}
