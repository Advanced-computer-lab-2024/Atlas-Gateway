import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
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
	transportation?: Partial<TTransportation>;
}) => {
	const form = useForm<TTransportation>({
		resolver: zodResolver(transportationSchema),
	});
	const { control, reset } = form;

	useEffect(() => {
		if (transportation) {
			reset({ ...transportation });
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
												onValueChange={field.onChange}
												value={field.value}
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
												type="number"
												{...field}
												placeholder="Price"
												min={0}
											/>
										</FormControl>
										<FormDescription>
											Enter transportation price.
										</FormDescription>
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
												disabled={[
													{
														after: new Date(),
													},
												]}
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
												disabled={[
													{
														after: new Date(),
													},
												]}
											/>
										</FormControl>
										<FormDescription>
											Enter drop-off time.
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
