import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

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
import { transportationSchema } from "../../Transportations/Form/schema";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "../../components/ui/sheet";
import { TTransportation } from "../../types/global";
import { useCreateTransportation, useTransportations, useUpdateTransportation } from "../../api/data/useTransportations";

const TransportationForm = ({
	open,
	setOpen,
	transportation,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
	transportation?: any;
}) => {
	const form = useForm({
		resolver: zodResolver(transportationSchema),
		defaultValues: {
			name: "",
			type: "Bus",
			price: 0,
			availability: 0,
			pickUpLocation: "",
			dropOffLocation: "",
			pickUpTime: new Date().toString(),
			dropOffTime: new Date().toString(),
			timeTakenInMins: 0,
			numberOfBookings: 0,
			tourists: [],
			createdBy: "",
		},
	});
	const { control, reset } = form;

	useEffect(() => {
		if (transportation) {
			reset({...transportation});
		}
	}, [transportation, reset]);

	const { refetch } = useTransportations();

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
						{transportation ? "Edit Transportation" : "Add Transportation"}
					</SheetTitle>
				</SheetHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="flex flex-col gap-4"
					>
						<Flex isColumn gap="4" className="overflow-y-scroll h-[84vh]">
							<FormField
								control={control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Transportation name" />
										</FormControl>
										<FormDescription>Enter transportation name.</FormDescription>
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
											<Input {...field} placeholder="Bus, Car, Train, etc." />
										</FormControl>
										<FormDescription>Enter type of transportation.</FormDescription>
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
												type="number"
												{...field}
												placeholder="Price"
												min={0}
											/>
										</FormControl>
										<FormDescription>Enter transportation price.</FormDescription>
									</FormItem>
								)}
							/>

							<FormField
								control={control}
								name="availability"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Availability</FormLabel>
										<FormControl>
											<Input
												type="number"
												{...field}
												placeholder="Availability"
												min={0}
											/>
										</FormControl>
										<FormDescription>Enter transportation availability.</FormDescription>
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
												date={new Date(field.value)}
												setDate={(date) => field.onChange(date?.toString())}
											/>
										</FormControl>
										<FormDescription>Enter pick-up time.</FormDescription>
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
												date={new Date(field.value)}
												setDate={(date) => field.onChange(date?.toString())}
											/>
										</FormControl>
										<FormDescription>Enter drop-off time.</FormDescription>
									</FormItem>
								)}
							/>

							<FormField
								control={control}
								name="timeTakenInMins"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Time Taken (in minutes)</FormLabel>
										<FormControl>
											<Input
												type="number"
												{...field}
												placeholder="Time Taken"
												min={0}
											/>
										</FormControl>
										<FormDescription>Enter time taken (in minutes).</FormDescription>
									</FormItem>
								)}
							/>

							<FormField
								control={control}
								name="numberOfBookings"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Number of Bookings</FormLabel>
										<FormControl>
											<Input
												type="number"
												{...field}
												placeholder="Number of bookings"
												min={0}
											/>
										</FormControl>
										<FormDescription>Enter the number of bookings.</FormDescription>
									</FormItem>
								)}
							/>

							<FormField
								control={control}
								name="tourists"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tourists</FormLabel>
										<FormControl>
											<Input
												type="text"
												{...field}
												placeholder="Tourists (comma separated)"
											/>
										</FormControl>
										<FormDescription>Enter tourists ids (optional).</FormDescription>
									</FormItem>
								)}
							/>

							<FormField
								control={control}
								name="createdBy"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Created By</FormLabel>
										<FormControl>
											<Input
												type="text"
												{...field}
												placeholder="Creator ID (optional)"
											/>
										</FormControl>
										<FormDescription>Enter creator ID (optional).</FormDescription>
									</FormItem>
								)}
							/>

						</Flex>

						<SheetFooter>
							<Button type="submit" className="w-40 h-10">
								{transportation ? "Update" : "Create"} Transportation
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
};

export default TransportationForm;
