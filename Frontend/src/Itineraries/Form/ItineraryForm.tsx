import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import {
	useCreateItinerary,
	useItineraries,
	useUpdateItinerary,
} from "@/api/data/useItineraries";
import { useTags } from "@/api/data/useTags";
import Label from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Flex } from "@/components/ui/flex";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { languageOptions } from "@/types/consts";
import { TItinerary } from "@/types/global";

import { formSchema } from "./schema";

export default function ItineraryForm({
	open,
	setOpen,
	itinerary,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
	itinerary?: TItinerary;
}) {
	const form = useForm<TItinerary>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			timeline: "",
			startDateTime: new Date().toString(),
			endDateTime: new Date().toString(),
			accessibility: "",
			price: 0,
			activities: [
				{
					title: "Activity 1",
					dateTime: new Date().toString(),
					durationM: 30,
				},
			],
		},
	});

	useEffect(() => {
		form.reset({
			...itinerary,
			// @ts-expect-error Add unique types for form later
			tags: itinerary?.tags.map((tag) => tag._id),
		});
	}, [form, itinerary]);

	const { refetch } = useItineraries();

	const { data: tags } = useTags();
	const { doCreateItinerary } = useCreateItinerary(() => {
		refetch();
		form.reset();
	});
	const { doUpdateItinerary } = useUpdateItinerary(() => {
		refetch();
		form.reset();
	});

	const handleSubmit = (values: TItinerary) => {
		if (itinerary) {
			doUpdateItinerary({ ...itinerary, ...values });
		} else {
			doCreateItinerary(values);
		}
		setOpen(false);
	};

	const activities = useWatch<TItinerary>({
		control: form.control,
		name: "activities",
	}) as TItinerary["activities"];

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetContent className="sm:max-w-[700px] overflow-y-scroll">
				<SheetHeader>
					<SheetTitle>
						{itinerary ? "Edit Itinerary" : "Create Itinerary"}
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
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input
												placeholder="Title"
												{...field}
												className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
											/>
										</FormControl>
										<FormDescription>
											Title of the itinerary
										</FormDescription>
									</FormItem>
								)}
							/>
							<Flex isColumn gap="4">
								<Flex
									isColumn
									gap="4"
									className="max-h-96 overflow-y-scroll"
								>
									{activities?.map((activity, index) => (
										<Flex isColumn>
											<Flex gap="2" align="center">
												<Label.Mid300>
													{activity.title ||
														`Activity ${index + 1}`}
												</Label.Mid300>
												<Trash2
													className="cursor-pointer"
													size={20}
													onClick={() => {
														const newActivities =
															activities.filter(
																(_, i) =>
																	i !== index,
															);
														form.setValue(
															"activities",
															newActivities,
														);
													}}
												/>
											</Flex>
											<Flex gap="1">
												<FormField
													control={form.control}
													name={`activities.${index}.title`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>
																Title
															</FormLabel>
															<FormControl>
																<Input
																	placeholder="Title"
																	{...field}
																	className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
																/>
															</FormControl>
															<FormDescription>
																Title of
																activity
															</FormDescription>
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name={`activities.${index}.dateTime`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>
																Date
															</FormLabel>
															<FormControl>
																<DateTimePicker
																	date={
																		field?.value
																			? new Date(
																					field?.value,
																				)
																			: new Date()
																	}
																	setDate={(
																		date,
																	) =>
																		field.onChange(
																			date?.toString(),
																		)
																	}
																/>
															</FormControl>
															<FormDescription>
																Enter activity
																Date & Time.
															</FormDescription>
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name={`activities.${index}.durationM`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>
																Duration
															</FormLabel>
															<FormControl>
																<Input
																	placeholder="Duration"
																	{...field}
																	onChange={(
																		e,
																	) =>
																		field.onChange(
																			parseInt(
																				e
																					.target
																					.value,
																			),
																		)
																	}
																	className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
																/>
															</FormControl>
															<FormDescription>
																Duration of
																activity in
																minutes
															</FormDescription>
														</FormItem>
													)}
												/>
											</Flex>
										</Flex>
									))}
								</Flex>
								<Button
									type="button"
									onClick={() =>
										form.setValue("activities", [
											...activities,
											{
												title: `Activity ${activities.length + 1}`,
												dateTime: new Date().toString(),
												durationM: 30,
											},
										])
									}
								>
									Add Activity
								</Button>
							</Flex>
							<FormField
								control={form.control}
								name="timeline"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Timeline</FormLabel>
										<FormControl>
											<Textarea
												placeholder="awdwadawda"
												className="resize-none"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Timeline for the itinerary
										</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="startDateTime"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Start Date & Time</FormLabel>
										<FormControl>
											<DateTimePicker
												date={
													field?.value
														? new Date(field?.value)
														: new Date()
												}
												setDate={(date) =>
													field.onChange(
														date?.toString(),
													)
												}
											/>
										</FormControl>
										<FormDescription>
											Enter activity Date & Time.
										</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="endDateTime"
								render={({ field }) => (
									<FormItem>
										<FormLabel>End Date & Time</FormLabel>
										<FormControl>
											<DateTimePicker
												date={
													field?.value
														? new Date(field?.value)
														: new Date()
												}
												setDate={(date) =>
													field.onChange(
														date?.toString(),
													)
												}
											/>
										</FormControl>
										<FormDescription>
											Enter activity Date & Time.
										</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="tags"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-normal">
											Select Tags
										</FormLabel>
										<FormControl>
											<MultiSelect
												options={
													tags?.map((tag) => {
														return {
															value: tag._id,
															label: tag.name,
														};
													}) || []
												}
												defaultValue={
													field.value?.map((tag) => {
														return tag._id;
													}) || []
												}
												onValueChange={(values) =>
													field.onChange(values)
												}
											/>
										</FormControl>
										<FormDescription>
											Select activity tags.
										</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="accessibility"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Accessibility</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter the acessibility"
												{...field}
												className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
											/>
										</FormControl>
										<FormDescription>a</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="language"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Language</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select your nationality" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{languageOptions.map(
													(option) => (
														<SelectItem
															key={option.value}
															value={option.value}
														>
															{option.label}
														</SelectItem>
													),
												)}
											</SelectContent>
										</Select>
										<FormDescription>
											Select your nationality.
										</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
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
										<FormDescription>a</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
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
										<FormDescription>a</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="pickUpLocation"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Pick Up</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter the Pick Up location"
												{...field}
												className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
											/>
										</FormControl>
										<FormDescription>a</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="dropOffLocation"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Drop Off Location</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter the Drop Off location"
												{...field}
												className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
											/>
										</FormControl>
										<FormDescription>a</FormDescription>
									</FormItem>
								)}
							/>
						</Flex>
						<SheetFooter>
							<Button type="submit" className="w-40 h-12">
								{itinerary ? "Update" : "Create"} Itinerary
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
}
