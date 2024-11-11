import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { response } from "express";
import { CalendarIcon, PlaneLanding, PlaneTakeoff } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { useSearchFlights } from "@/api/data/useFlights";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
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
import { classes, locations } from "@/types/consts";

import { IFlight } from "../../../../Backend/src/Models/Flight/flight.model";
import { formSchema } from "./schema";

interface props {
	addFlight: (flight: IFlight) => void;
}

const SearchForm = ({ addFlight }: props) => {
	const { doSearchFlights, isPending } = useSearchFlights((flights) => {
		flights.data.forEach((flight: any) => {
			addFlight(flight);
		});
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});
	const { handleSubmit, control } = form;
	const onSubmit = (data: z.infer<typeof formSchema>) => {
		data.returnDate = new Date(data.returnDate).toISOString().split("T")[0];
		data.departureDate = new Date(data.departureDate)
			.toISOString()
			.split("T")[0];
		doSearchFlights({ ...data, directFlightsOnly: true });
	};

	return (
		<FormProvider {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
				<div className="flex gap-5 w-[1000px]">
					<FormField
						control={control}
						name="originLocationCode"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Departure</FormLabel>
								<Select
									onValueChange={field.onChange}
									value={field.value}
								>
									<FormControl className="rounded-3xl h-[48px]">
										<SelectTrigger className="flex gap-4">
											<div className="flex items-center gap-1">
												<PlaneTakeoff />
												<h2>From:</h2>
											</div>
											<SelectValue placeholder="Select departure" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{locations.map((location) => (
											<SelectItem
												key={location.value}
												value={location.value}
											>
												{location.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="destinationLocationCode"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Destination</FormLabel>
								<Select
									onValueChange={field.onChange}
									value={field.value}
								>
									<FormControl className="rounded-3xl h-[48px]">
										<SelectTrigger className="flex gap-4">
											<div className="flex items-center gap-1">
												<PlaneLanding />
												<h2>To:</h2>
											</div>
											<SelectValue placeholder="Select Destination" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{locations.map((location) => (
											<SelectItem
												key={location.value}
												value={location.value}
											>
												{location.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="departureDate"
						render={({ field }) => (
							<FormItem className="">
								<FormLabel>Departure Date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl className="rounded-3xl h-[48px]">
											<Button
												variant="outline"
												className={cn(
													"w-full pl-3 text-left font-normal",
													!field.value &&
														"text-muted-foreground",
												)}
											>
												{field.value ? (
													format(
														new Date(field.value),
														"PPP",
													)
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent
										className="w-auto p-0"
										align="start"
									>
										<Calendar
											mode="single"
											selected={
												field.value
													? new Date(field.value)
													: undefined
											}
											onSelect={(date) =>
												field.onChange(
													date
														? date.toISOString()
														: null,
												)
											}
											captionLayout="dropdown-buttons"
											fromYear={
												new Date().getFullYear() - 80
											}
											toYear={
												new Date().getFullYear() + 10
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="returnDate"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Return Date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl className="rounded-3xl h-[48px]">
											<Button
												variant="outline"
												className={cn(
													"w-full pl-3 text-left font-normal",
													!field.value &&
														"text-muted-foreground",
												)}
											>
												{field.value ? (
													format(
														new Date(field.value),
														"PPP",
													)
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent
										className="w-auto p-0"
										align="start"
									>
										<Calendar
											mode="single"
											selected={
												field.value
													? new Date(field.value)
													: undefined
											}
											onSelect={(date) =>
												field.onChange(
													date
														? date.toISOString()
														: null,
												)
											}
											captionLayout="dropdown-buttons"
											fromYear={
												new Date().getFullYear() - 80
											}
											toYear={
												new Date().getFullYear() + 10
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="adults"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Adults</FormLabel>
								<FormControl className="rounded-3xl h-[48px]">
									<Input
										placeholder="Enter the Adults"
										type="number"
										{...field}
										onChange={(e) =>
											field.onChange(
												parseInt(e.target.value),
											)
										}
										className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="travelClass"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Class</FormLabel>
								<Select
									onValueChange={field.onChange}
									value={field.value}
								>
									<FormControl>
										<SelectTrigger className="flex gap-4">
											<SelectValue placeholder="Select Class" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{classes.map((flightClass) => (
											<SelectItem
												key={flightClass.value}
												value={flightClass.value}
											>
												{flightClass.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
				</div>
				<Button
					className="text-black w-28 self-center rounded-2xl mt-5 bg-green-600 hover:bg-green-700 hover:text-white"
					type="submit"
					disabled={isPending}
				>
					{isPending ? "Searching..." : "Search Flights"}
				</Button>
			</form>
		</FormProvider>
	);
};

export default SearchForm;
