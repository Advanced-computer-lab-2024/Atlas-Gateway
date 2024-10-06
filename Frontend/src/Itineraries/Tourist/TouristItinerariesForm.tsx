import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from 'react-hook-form';
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DatePickerWithRange } from "@/components/ui/DateRangePicker";
import { Checkbox } from "@/components/ui/checkbox";

// activities and the locations that will be visited for a
// specific date range inlcuding tags
const tags = [
	{
		id: "monuments",
		label: "Monuments",
	},
	{
		id: "museums",
		label: "Museums",
	},
	{
		id: "religiousSites",
		label: "Religious Sites",
	},
	{
		id: "castle",
		label: "Castles",
	},
] as const

const formSchema = z.object({
	activities: z.array(z.string().min(1, 'Activity is required')),
	locations: z.array(z.string().min(1, 'Location is required')),
	dateRange: z.object({
		from: z.date(),
		to: z.date(),
	}).refine(data => data.from < data.to, {
		message: "Start date must be before end date",
		path: ["to"],
	}),
	tags: z.array(z.string()).refine((value) => value.some((item) => item), {
		message: "You have to select at least one item.",
	}),
});

const TouristItineraryForm: React.FC = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			activities: [],
			locations: [],
			dateRange: { from: new Date, to: new Date },
			tags: [""],
		},
	});

	const handleSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
		form.reset();
	};

	return (
		<div className="grid place-items-center items-center w-full h-full bg-gray-100 p-4">
			<Card className="w-full max-w-2xl h-auto rounded-lg shadow-lg p-6 bg-white">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-6">
						<h2 className="text-2xl align-center font-semibold mb-4 text-gray-700">Itinerary Details</h2>

						<h3 className="text-lg font-medium mb-2 text-gray-600">Activities</h3>
						<Controller
							name="activities"
							control={form.control}
							render={({ field: { onChange, value } }) => (
								<>
									{value.map((activity, index) => (
										<div key={index} className="flex gap-2 mb-2">
											<input
												type="text"
												value={activity}
												onChange={(e) => {
													const newActivity = [...value];
													newActivity[index] = e.target.value;
													onChange(newActivity);
												}}
												placeholder={`Activity ${index + 1}`}
												className="border border-gray-300 rounded-md px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 flex-1"
											/>
											<button
												type="button"
												onClick={() => {
													const newActivity = value.filter((_, i) => i !== index);
													onChange(newActivity);
												}}
												className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600"
											>
												Remove
											</button>
										</div>
									))}
									<button
										type="button"
										onClick={() => {
											onChange([...value, ""]);
										}}
										className="mt-2 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
									>
										Add Activity
									</button>
								</>
							)}
						/>

						<h3 className="text-lg font-medium mb-2 text-gray-600">Locations</h3>
						<Controller
							name="locations"
							control={form.control}
							render={({ field: { onChange, value } }) => (
								<>
									{value.map((location, index) => (
										<div key={index} className="flex gap-2 mb-2">
											<input
												type="text"
												value={location}
												onChange={(e) => {
													const newLocations = [...value];
													newLocations[index] = e.target.value;
													onChange(newLocations);
												}}
												placeholder={`Location ${index + 1}`}
												className="border border-gray-300 rounded-md px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 flex-1"
											/>
											<button
												type="button"
												onClick={() => {
													const newLocations = value.filter((_, i) => i !== index);
													onChange(newLocations);
												}}
												className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600"
											>
												Remove
											</button>
										</div>
									))}
									<button
										type="button"
										onClick={() => {
											onChange([...value, ""]);
										}}
										className="mt-2 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
									>
										Add Location
									</button>
								</>
							)}
						/>

						<h3 className="text-lg font-medium mb-2 text-gray-600">Date Range</h3>
						<Controller
							name="dateRange"
							control={form.control}
							render={({ field: { onChange, value } }) => (
								<DatePickerWithRange
									value={{
										from: value.from || new Date(),
										to: value.to || new Date(),
									}}
									onChange={(range: any) => {
										onChange({
											from: range.from,
											to: range.to,
										});
									}}
									className="border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
								/>
							)}
						/>

						<FormField
							control={form.control}
							name="tags"
							render={() => (
								<FormItem>
									<div className="mb-4">
										<FormLabel className="text-base">Tags</FormLabel>
									</div>
									{tags.map((item) => (
										<FormField
											key={item.id}
											control={form.control}
											name="tags"
											render={({ field }) => {
												return (
													<FormItem className="flex flex-row items-start space-x-3">
														<FormControl>
															<Checkbox
																checked={field.value?.includes(item.id)}
																onCheckedChange={(checked) => {
																	return checked
																		? field.onChange([...field.value, item.id])
																		: field.onChange(field.value?.filter((value) => value !== item.id));
																}}
															/>
														</FormControl>
														<FormLabel className="font-normal">{item.label}</FormLabel>
													</FormItem>
												);
											}}
										/>
									))}
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="mt-6 flex justify-center">
							<Button
								type="submit"
								className="w-full max-w-xs bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
							>
								Submit
							</Button>
						</div>
					</form>
				</Form>
			</Card>
		</div>
	);
};

export default TouristItineraryForm;
