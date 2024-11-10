import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Map from "@/components/ui/map";

import { transportationSchema } from "../../Transportations/Form/schema";
import {
	useCreateTransportation,
	useTransportations,
	useUpdateTransportation,
} from "../../api/data/useTransportations";
import { Button } from "../../components/ui/button";
import { DateTimePicker } from "../../components/ui/date-time-picker";
import { Flex } from "../../components/ui/flex";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "../../components/ui/sheet";
import { TTransportation } from "../../types/global";

const TransportationForm = ({
	open,
	setOpen,
	transportation,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
	transportation?: TTransportation;
}) => {
	const form = useForm<TTransportation>({
		resolver: zodResolver(transportationSchema),
	});
	const { control, reset } = form;

	// Initialize local state for select value
	const [selectedType, setSelectedType] = useState(transportation?.type || "");

	useEffect(() => {
		if (transportation) {
			reset({ ...transportation });
		}
	}, [transportation, reset]);

	const {refetch } = useTransportations();
	
	const { doCreateTransportation } = useCreateTransportation(() => {
		refetch();
		form.reset();
	});
	const { doUpdateTransportation } = useUpdateTransportation(() => {
		refetch();
		form.reset();
	});

	const handleSubmit = (values: TTransportation) => {
		if (transportation) {
			doUpdateTransportation({ ...transportation, ...values });
		} else {
			doCreateTransportation(values);
		}
		setOpen(false);
	};

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetContent className="sm:max-w-[600px]">
				<SheetHeader>
					<SheetTitle>
						{transportation
							? "Edit Transportation"
							: "Add Transportation"}
					</SheetTitle>
				</SheetHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="flex flex-col gap-4"
					>
						<Flex
							isColumn
							gap="4"
							className="overflow-y-scroll h-[84vh]"
						>
							<FormField
								control={control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Transportation name"
											/>
										</FormControl>
										<FormDescription>
											Enter transportation name.
										</FormDescription>
									</FormItem>
								)}
							/>

							<FormField
								control={control}
								name="type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Type</FormLabel>
										<FormControl>
											<Select
												onValueChange={(value) => {
													field.onChange(value);
													setSelectedType(value); // Update local state
												}}
												value={selectedType}
											>
												<SelectTrigger className="w-[180px]">
													<SelectValue placeholder="Select a type">
														{field.value}
													</SelectValue>
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectItem
															value={"Bus"}
														>
															<SelectLabel>
																Bus
															</SelectLabel>
														</SelectItem>
														<SelectItem
															value={"Car"}
														>
															<SelectLabel>
																Car
															</SelectLabel>
														</SelectItem>
														<SelectItem
															value={"Train"}
														>
															<SelectLabel>
																Train
															</SelectLabel>
														</SelectItem>
														<SelectItem
															value={"Plane"}
														>
															<SelectLabel>
																Plane
															</SelectLabel>
														</SelectItem>
														<SelectItem
															value={"Boat"}
														>
															<SelectLabel>
																Boat
															</SelectLabel>
														</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
										</FormControl>
									</FormItem>
								)}
							/>

							{/* Price Field */}
							<FormField
								control={control}
								name="price"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Price</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter the price"
												type="number"
												{...field}
												onChange={(e) =>
													field.onChange(
														parseInt(
															e.target.value,
														),
													)
												}
												className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
											/>
										</FormControl>
										<FormDescription>
											Enter transportation price.
										</FormDescription>
									</FormItem>
								)}
							/>
							
							{/* Availability Field */}
							<FormField
								control={control}
								name="availability"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Availability</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter the availablity"
												type="number"
												{...field}
												onChange={(e) =>
													field.onChange(
														parseInt(
															e.target.value,
														),
													)
												}
												className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
											/>
										</FormControl>
										<FormDescription>
											Enter transportation availability.
										</FormDescription>
									</FormItem>
								)}
							/>

							<FormField
								control={control}
								name="pickUpTime"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Pick-Up Time</FormLabel>
										<FormControl>
											<DateTimePicker
												date={
													field?.value
														? new Date(field?.value)
														: undefined
												}
												setDate={(date) =>
													field.onChange(
														date?.toString(),
													)
												}
												
											/>
										</FormControl>

										<FormDescription>
											Enter pick-up time.
										</FormDescription>
									</FormItem>
								)}
							/>

							<FormField
								control={control}
								name="dropOffTime"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Drop-Off Time</FormLabel>
										<FormControl>
											<DateTimePicker
												date={
													field?.value
														? new Date(field?.value)
														: undefined
												}
												setDate={(date) =>
													field.onChange(
														date?.toString(),
													)
												}
												
											/>
										</FormControl>
										<FormDescription>
											Enter drop-off time.
										</FormDescription>
									</FormItem>
								)}
							/>
							<Map
								setLocation={(location: string) => {
									form.setValue("pickUpLocation", location);
								}}
							/>
							<FormField
								control={control}
								name="pickUpLocation"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Pick Up Location</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="pickUpLocation"
											/>
										</FormControl>
										<FormDescription>
											Enter pick up location.
										</FormDescription>
									</FormItem>
								)}
							/>
							<Map
								setLocation={(location: string) => {
									form.setValue("dropOffLocation", location);
								}}
							/>
							<FormField
								control={control}
								name="dropOffLocation"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Drop Off Location</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="dropOffLocation"
											/>
										</FormControl>
										<FormDescription>
											Enter drop off location.
										</FormDescription>
									</FormItem>
								)}
							/>
						</Flex>

						<SheetFooter>
							<Button type="submit" className="w-40 h-10">
								{transportation ? "Update" : "Create"}{" "}
								Transportation
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
};

export default TransportationForm;
