import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";

import { useCategories } from "@/api/data/useCategories";
import { useTags } from "@/api/data/useTags";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Flex } from "@/components/ui/flex";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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

interface props {
	type: string;
	id?: string;
}

const ActivityForm = ({ type, id }: props) => {
	const { data: categories } = useCategories();
	const { data: tags } = useTags();

	const formMethods = useForm<TActivity>({
		resolver: zodResolver(activitySchema),
		defaultValues: {
			dateTime: new Date().toString(),
			categories: [],
			tags: [],
		},
	});

	const { handleSubmit, control, reset } = formMethods;

	useEffect(() => {
		reset(activity);
	}, [activity]);

	const onSubmit = (data: z.infer<typeof activitySchema>) => {
		!id
			? axios
					.post(`http://localhost:5000/api/activity/create`, data)
					.then((res) => {
						console.log(res.status);
						// will add here something to give a feedback later
					})
					.catch((error) => {
						console.log(error);
					})
			: axios
					.put(
						`http://localhost:5000/api/activity/update/${id}`,
						data,
					)
					.then((res) => {
						console.log(res.status);
						// will add here something to give a feedback later
					})
					.catch((error) => {
						console.log(error);
					});
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				{id ? (
					<button>
						<Pencil />
					</button>
				) : (
					<Button variant="outline">{type} activity</Button>
				)}
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>{type} an activity</SheetTitle>
				</SheetHeader>
				<FormProvider {...formMethods}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col gap-2 overflow-y-scroll h-full"
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
												field.onChange(date?.toString())
											}
										/>
									</FormControl>
									<FormDescription>
										Enter activity Date & Time.
									</FormDescription>
								</FormItem>
							)}
						/>
						<FormField // TODO: should be modified here by ali
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

						<div className="flex gap-2">
							<FormField
								control={control}
								name="minPrice"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Minimum Price</FormLabel>
										<FormControl>
											<Input
												type="number"
												min={0}
												{...field}
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
									<FormItem>
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
						</div>
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
										Select Categories
									</FormLabel>
									<FormControl>
										<MultiSelect
											options={
												categories?.map((category) => {
													return {
														value: category._id,
														label: category.name,
													};
												}) || []
											}
											value={field.value}
											onValueChange={(values) =>
												field.onChange(values)
											}
										/>
									</FormControl>
									<FormDescription>
										Select activity categories.
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
											value={field.value}
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
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<FormLabel>
											Is available to book?
										</FormLabel>
									</Flex>
								</FormItem>
							)}
						/>

						<SheetFooter>
							<Button type="submit">Save changes</Button>
						</SheetFooter>
					</form>
				</FormProvider>
			</SheetContent>
		</Sheet>
	);
};

export default ActivityForm;
