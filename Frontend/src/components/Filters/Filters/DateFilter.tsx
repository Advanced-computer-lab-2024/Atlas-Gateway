import { PopoverTrigger } from "@radix-ui/react-popover";
import { format, formatDate } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useCallback, useState } from "react";



import { useQueryString } from "@/api/data/useQueryString";
import Label from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Flex } from "@/components/ui/flex";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";



import { TDateFilter } from "../types";


export default function DateFilter({
	filter,
	removeFilter,
}: {
	filter: TDateFilter;
	removeFilter: () => void;
}) {
	const [startDate, setStartDate] = useState<Date | undefined>(undefined);
	const [endDate, setEndDate] = useState<Date | undefined>(undefined);

	const [query, updateQuery] = useQueryString();

	const applyFilter = useCallback(() => {
		updateQuery({
			...query,
			[filter.filterName]: `${!startDate ? "null" : formatDate(startDate, "yyyy-MM-dd")},${!endDate ? "null" : formatDate(endDate, "yyyy-MM-dd")}`,
		});
	}, [endDate, filter.filterName, query, startDate, updateQuery]);

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost">{filter.label}</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-52">
				<Flex isColumn gap="2">
					<Flex isColumn gap="2">
						<Label.Mid300>From</Label.Mid300>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={"outline"}
									className={cn(
										"w-[280px] justify-start text-left font-normal",
										!startDate && "text-muted-foreground",
									)}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{startDate ? (
										format(startDate, "PPP")
									) : (
										<span>Pick a start date</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0">
								<Calendar
									mode="single"
									selected={startDate}
									onSelect={setStartDate}
									initialFocus
									toDate={endDate}
								/>
							</PopoverContent>
						</Popover>
					</Flex>
					<Flex isColumn gap="2">
						<Label.Mid300>To</Label.Mid300>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={"outline"}
									className={cn(
										"w-[280px] justify-start text-left font-normal",
										!endDate && "text-muted-foreground",
									)}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{endDate ? (
										format(endDate, "PPP")
									) : (
										<span>Pick an end date</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0">
								<Calendar
									mode="single"
									selected={endDate}
									onSelect={setEndDate}
									initialFocus
									fromDate={startDate}
								/>
							</PopoverContent>
						</Popover>
					</Flex>
					<hr />
					<Flex justify="between">
						<Button onClick={removeFilter}>Remove</Button>
						<Button onClick={applyFilter}>Apply</Button>
					</Flex>
				</Flex>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}