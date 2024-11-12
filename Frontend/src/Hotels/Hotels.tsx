import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

import { useHotels } from "@/api/data/useHotels";
import { useQueryString } from "@/api/data/useQueryString";
import { Searchbar } from "@/components/ui/Searchbar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Flex } from "@/components/ui/flex";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { citycodes } from "@/types/consts";
import { THotel } from "@/types/global";

import { AmadeusTokenProvider } from "./AmadeusContext";
import HotelDetailsSheet from "./HotelDetailsSheet";
import HotelsCard from "./HotelsCard";

const Hotels = () => {
	const [cityCode, setCityCode] = useState("");
	const { data } = useHotels(cityCode);

	const [hotel, setHotel] = useState<THotel | null>(null);
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useQueryString();

	const [checkInDate, setCheckInDate] = useState<Date | null>(null);
	const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

	const openEditDrawer = (hotel: THotel) => {
		setHotel(hotel);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setHotel(null);
	};

	return (
		<AmadeusTokenProvider>
			<Flex
				isColumn
				gap="4"
				className="w-full h-full p-4 overflow-y-scroll"
			>
				<Flex
					className="bg-surface-secondary p-2"
					gap="5"
					align="center"
					justify="center"
				>
					<Select onValueChange={setCityCode} value={cityCode}>
						<SelectTrigger className="flex gap-4 w-52">
							<SelectValue placeholder="Select City Code" />
						</SelectTrigger>
						<SelectContent>
							{citycodes.map((code) => (
								<SelectItem key={code.value} value={code.value}>
									{code.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Searchbar />
					<div className="w-16 h-5 bg-black rounded-full" />
					<Input
						placeholder="Number of adults"
						type="number"
						value={query?.adults}
						onChange={(e) =>
							setQuery({ ...query, adults: e.target.value })
						}
						className="bg-white w-48"
					/>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className={cn(
									"w-56 pl-3 text-left font-normal",
									!checkInDate && "text-muted-foreground",
								)}
							>
								{checkInDate ? (
									format(checkInDate, "PPP")
								) : (
									<span>Pick a check in date</span>
								)}
								<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								mode="single"
								selected={
									checkInDate
										? new Date(query.checkInDate)
										: undefined
								}
								onSelect={(date) => {
									if (!date) return;
									setCheckInDate(date);
									setQuery({
										...query,
										checkInDate: date.toISOString(),
									});
								}}
								captionLayout="dropdown-buttons"
								fromYear={new Date().getFullYear() - 80}
								toDate={new Date()}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className={cn(
									"w-56 pl-3 text-left font-normal",
									!checkOutDate && "text-muted-foreground",
								)}
							>
								{checkOutDate ? (
									format(checkOutDate, "PPP")
								) : (
									<span>Pick a check out date</span>
								)}
								<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								mode="single"
								selected={
									checkOutDate
										? new Date(checkOutDate)
										: undefined
								}
								onSelect={(date) => {
									if (!date) return;
									setCheckOutDate(date);
									setQuery({
										...query,
										checkOutDate: date.toISOString(),
									});
								}}
								captionLayout="dropdown-buttons"
								fromYear={new Date().getFullYear() - 80}
								toDate={new Date()}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
				</Flex>
				<Flex
					className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
					gap="4"
				>
					{data?.map((hotel: THotel, index: number) => (
						<HotelsCard
							key={index}
							hotel={hotel}
							openEditDrawer={openEditDrawer}
						/>
					))}
				</Flex>
				<HotelDetailsSheet
					open={open}
					hotel={hotel}
					cityCode={cityCode}
					handleClose={handleClose}
				/>
			</Flex>
		</AmadeusTokenProvider>
	);
};

export default Hotels;
