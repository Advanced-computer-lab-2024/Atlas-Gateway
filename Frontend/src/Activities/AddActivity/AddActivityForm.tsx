import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

import { Checkbox } from "../../components/ui/checkbox";
import { activitySchema } from "./schema";

interface Tag {
	_id: string;
	name: string;
	type: string;
}
interface category {
	_id: string;
	name: string;
}
const AddAdvertiserForm = () => {
	const [tags, setTags] = useState<Tag[]>([]);
	const [category, setCategories] = useState<category[]>([]);

	const formMethods = useForm<z.infer<typeof activitySchema>>({
		resolver: zodResolver(activitySchema),
		defaultValues: {
			category: [],
			tags: [],
		},
	});
	const { handleSubmit, control } = formMethods;

	const onSubmit = (data: z.infer<typeof activitySchema>) => {
		axios
			.post(`http://localhost:5000/api/activity/create`, data)
			.then((res) => {
				console.log(res.status);
				// will add here something to give a feedback later
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/category/list")
			.then((res) => {
				setCategories(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		const fetchTags = async () => {
			try {
				const [preference, historical] = await Promise.all([
					axios.get("http://localhost:5000/api/tags/preference/list"),
					axios.get("http://localhost:5000/api/tags/historical/list"),
				]);
				const tags = [...preference.data, ...historical.data];
				setTags(tags);
			} catch (error) {
				console.log(error);
			}
		};
		fetchTags();
	}, []);

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">Add activity</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Add an activity</SheetTitle>
				</SheetHeader>
				<FormProvider {...formMethods}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col gap-2"
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
										<Input
											{...field}
											type="datetime-local"
											placeholder="date and time"
										/>
									</FormControl>
									<FormDescription>
										Enter activity Date & Time.
									</FormDescription>
								</FormItem>
							)}
						/>
						<FormField // should be modified here by ali
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
										<FormLabel>min Price</FormLabel>
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
										<FormLabel>max Price</FormLabel>
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
											placeholder="special discounts"
										/>
									</FormControl>
									<FormDescription>
										Enter activity special discounts.
									</FormDescription>
								</FormItem>
							)}
						/>
						<div className="flex gap-2">
							<FormField
								control={control}
								name="category"
								render={({ field }) => (
									<FormItem>
										<div className="flex flex-col space-y-2">
											{category.map((cat) => (
												<div
													key={cat._id}
													className="flex flex-row items-center space-x-2"
												>
													<FormControl>
														<Checkbox
															checked={field.value?.includes(
																cat._id,
															)}
															onCheckedChange={(
																checked,
															) => {
																if (checked) {
																	field.onChange(
																		[
																			...field.value,
																			cat._id,
																		],
																	);
																} else {
																	field.onChange(
																		field.value.filter(
																			(
																				value,
																			) =>
																				value !==
																				cat._id,
																		),
																	);
																}
															}}
														/>
													</FormControl>
													<FormLabel className="font-normal">
														{cat.name}
													</FormLabel>
												</div>
											))}
										</div>
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
										<div className="flex flex-col space-y-2">
											{tags.map((tag) => (
												<div
													key={tag._id}
													className="flex flex-row items-center space-x-2"
												>
													<FormControl>
														<Checkbox
															checked={field.value?.includes(
																tag._id,
															)}
															onCheckedChange={(
																checked,
															) => {
																if (checked) {
																	field.onChange(
																		[
																			...field.value,
																			tag._id,
																		],
																	);
																} else {
																	field.onChange(
																		field.value.filter(
																			(
																				value,
																			) =>
																				value !==
																				tag._id,
																		),
																	);
																}
															}}
														/>
													</FormControl>
													<FormLabel className="font-normal">
														{tag.name}
													</FormLabel>
												</div>
											))}
										</div>
										<FormDescription>
											Select activity categories.
										</FormDescription>
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={control}
							name="isOpen"
							render={({ field }) => (
								<FormItem>
									<div className="flex items-center gap-2">
										<FormLabel>isOpen</FormLabel>
										<FormControl className="w-5">
											<Input type="checkbox" {...field} />
										</FormControl>
									</div>
									<FormDescription>
										Enter activity special discounts.
									</FormDescription>
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

export default AddAdvertiserForm;
