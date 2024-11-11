import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import { CalendarIcon } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";



import { useSearchHotels } from "@/api/data/useHotels";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { citycodes } from "@/types/consts";



import { IHotelBooking } from "../../../../Backend/src/Models/Hotel/hotel.model";
import { formSchema } from "./schema";


interface props {
	addHotels: (hotel: IHotelBooking) => void;
	removeHotels: () => void;
}

const SearchForm = ({ addHotels, removeHotels }: props) => {
	const { doSearchHotels, isPending } = useSearchHotels((hotels) => {
		removeHotels();
		hotels.data.forEach((hotel: any) => {
			addHotels(hotel);
		});
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});
	const { handleSubmit, control } = form;
	const onSubmit = (data: z.infer<typeof formSchema>) => {
		if (data.checkOutDate) {
			data.checkOutDate = new Date(data.checkOutDate).toLocaleDateString(
				"en-CA",
			);
		}

		data.checkInDate = new Date(data.checkInDate).toLocaleDateString(
			"en-CA",
		);
		doSearchHotels(data);
	

	};

	return (
		<FormProvider {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
				<div className="flex gap-5 w-[1000px]">
					<FormField
						control={control}
						name="cityCode"
						render={({ field }) => (
							<FormItem>
								<FormLabel>City Code</FormLabel>
								<Select
									onValueChange={field.onChange}
									value={field.value}
								>
									<FormControl className="rounded-3xl h-[48px]">
										<SelectTrigger className="flex gap-4">
											<SelectValue placeholder="Select City Code" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{citycodes.map((code) => (
											<SelectItem
												key={code.value}
												value={code.value}
											>
												{code.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="checkInDate"
						render={({ field }) => (
							<FormItem className="">
								<FormLabel>Check In Date</FormLabel>
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
						name="checkOutDate"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Check Out Date</FormLabel>
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
				</div>
				<Button
					className="text-black w-28 self-center rounded-2xl mt-5 bg-green-600 hover:bg-green-700 hover:text-white"
					type="submit"
					disabled={isPending}
				>
					{isPending ? "Searching..." : "Search Hotels"}
				</Button>
			</form>
		</FormProvider>
	);
};

export default SearchForm;