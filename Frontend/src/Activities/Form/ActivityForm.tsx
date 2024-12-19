import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
	useActivities,
	useCreateActivity,
	useUpdateActivity,
} from "@/api/data/useActivities";
import { useCategories } from "@/api/data/useCategories";
import { useTags } from "@/api/data/useTags";
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
import Map from "@/components/ui/map";
import { MultiSelect } from "@/components/ui/multi-select";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { TActivity } from "@/types/global";

import { Checkbox } from "../../components/ui/checkbox";
import { activitySchema } from "./schema";

const ActivityForm = ({
	open,
	setOpen,
	activity,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
	activity?: TActivity;
}) => {
	const { data: categories } = useCategories();
	const { data: tags } = useTags();

	const form = useForm<TActivity>({
		resolver: zodResolver(activitySchema),
		defaultValues: {
			dateTime: new Date().toString(),
			categories: [],
			tags: [],
		},
	});
	const { control, reset } = form;

	useEffect(() => {
		if (activity) {
			reset({
				...activity,
				// @ts-expect-error Add unique types for form later
				tags: activity.tags.map((tag) => tag._id),
				// @ts-expect-error Add unique types for form later
				categories: [activity?.categories?.[0]?._id],
			});
		}
	}, [activity, reset]);

	const { refetch } = useActivities();

	const { doCreateActivity } = useCreateActivity(() => {
		refetch();
		form.reset();
	});
	const { doUpdateActivity } = useUpdateActivity(() => {
		refetch();
		form.reset();
	});

	const handleSubmit = (values: TActivity) => {
		if (activity) {
			doUpdateActivity({ ...activity, ...values });
		} else {
			doCreateActivity(values);
		}
		setOpen(false);
	};

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetContent className="sm:max-w-[600px]">
				<SheetHeader>
					<SheetTitle>
						{activity ? "Edit Activity" : "Add Activity"}
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
												placeholder="activity name"
											/>
										</FormControl>
										<FormDescription>
											Enter activity name.
										</FormDescription>
									</FormItem>
								)}
							/>

							<FormField
								control={control}
								name="dateTime"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Date & Time</FormLabel>
										<FormControl>
											<DateTimePicker
												date={new Date(field?.value)}
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
							<Map
								setLocation={(location: string) => {
									form.setValue("location", location);
								}}
							/>
							<FormField
								control={control}
								name="location"
								render={({ field }) => (
									<FormItem>
										<FormLabel>location</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="location"
											/>
										</FormControl>
										<FormDescription>
											Enter activity location.
										</FormDescription>
									</FormItem>
								)}
							/>
							<Flex gap="2">
								<FormField
									control={control}
									name="minPrice"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Minimum Price</FormLabel>
											<FormControl>
												<Input
													type="number"
													min={0}
													{...field}
													className="w-full"
													placeholder="min Price"
												/>
											</FormControl>
											<FormDescription>
												Enter activity min Price.
											</FormDescription>
										</FormItem>
									)}
								/>
								<FormField
									control={control}
									name="maxPrice"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Maximum Price</FormLabel>
											<FormControl>
												<Input
													type="number"
													min={0}
													{...field}
													placeholder="max Price"
												/>
											</FormControl>
											<FormDescription>
												Enter activity max Price.
											</FormDescription>
										</FormItem>
									)}
								/>
							</Flex>
							<FormField
								control={control}
								name="specialDiscounts"
								render={({ field }) => (
									<FormItem>
										<FormLabel>special discounts</FormLabel>
										<FormControl>
											<Input
												type="number"
												{...field}
												placeholder="special discounts in %"
											/>
										</FormControl>
										<FormDescription>
											Enter activity special discounts %.
										</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="categories"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-normal">
											Select category
										</FormLabel>
										<FormControl>
											<MultiSelect
												options={
													categories?.map(
														(category) => {
															return {
																value: category._id,
																label: category.name,
															};
														},
													) || []
												}
												value={field.value}
												onValueChange={(values) =>
													field.onChange(values)
												}
												maxCount={1}
											/>
										</FormControl>
										<FormDescription>
											Select activity category.
										</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={control}
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
												defaultValue={field.value}
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
								control={control}
								name="isOpen"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<Flex gap="2" align="center">
											<FormControl className="w-5">
												<Checkbox
													checked={field.value}
													onCheckedChange={
														field.onChange
													}
												/>
											</FormControl>
											<FormLabel>
												Is available to book?
											</FormLabel>
										</Flex>
									</FormItem>
								)}
							/>
						</Flex>
						<SheetFooter>
							<Button type="submit" className="w-40 h-10">
								{activity ? "Update" : "Create"} Activity
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
};

export default ActivityForm;
