"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/togglegroup";

import { formSchema } from "./schema";

const PlacesForm: React.FC = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
			ticketF: 0,
			ticketN: 0,
			ticketS: 0,
			days: [],
		},
	});

	const { watch } = form;
	const days = watch("days");

	const handleSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
		form.reset();
	};

	return (
		<div className="grid place-items-center items-center place-content-center w-full h-full">
			<Card className="w-[1000px] h-[700px] rounded-lg p-4">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="flex gap-8"
					>
						<div id="info" className="flex-1">
							<h2 className="text-lg font-medium mb-4">
								Information
							</h2>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter the place's name"
												{...field}
												className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Enter the place's description"
												{...field}
												className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<h3 className="text-lg font-medium mt-4">
								Ticket Prices
							</h3>
							<Flex gap="4" className="w-full">
								<FormField
									control={form.control}
									name="ticketF"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Foreigners</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter the price for foreigners"
													{...field}
													className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="ticketN"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Natives</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter the price for natives"
													{...field}
													className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="ticketS"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Students</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter the price for students"
													{...field}
													className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</Flex>
						</div>

						<div id="hours" className="flex-1">
							<h2 className="text-lg font-medium mt-4">
								Opening Hours
							</h2>

							<FormField
								control={form.control}
								name="days"
								render={({ field }) => (
									<FormItem className="flex items-center gap-3">
										<FormLabel>Working Days</FormLabel>
										<FormControl>
											<ToggleGroup
												variant="outline"
												type="multiple"
												value={field.value}
												onValueChange={field.onChange}
												className="mb-4"
											>
												<ToggleGroupItem value="sat">
													Sa
												</ToggleGroupItem>
												<ToggleGroupItem value="sun">
													Su
												</ToggleGroupItem>
												<ToggleGroupItem value="mon">
													Mo
												</ToggleGroupItem>
												<ToggleGroupItem value="tue">
													Tu
												</ToggleGroupItem>
												<ToggleGroupItem value="wed">
													We
												</ToggleGroupItem>
												<ToggleGroupItem value="thu">
													Th
												</ToggleGroupItem>
												<ToggleGroupItem value="fri">
													Fr
												</ToggleGroupItem>
											</ToggleGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{days.includes("sat") && (
								<Flex align="center" gap="2">
									<label className="whitespace-nowrap w-[100px]">
										Saturday:
									</label>
									<FormField
										control={form.control}
										name="openSat"
										render={({ field }) => (
											<FormItem className="flex-1 flex items-center gap-2">
												<FormLabel>From</FormLabel>
												<FormControl>
													<Input
														type="time"
														{...field}
														className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="closeSat"
										render={({ field }) => (
											<FormItem className="flex-1 flex items-center gap-2">
												<FormLabel>To</FormLabel>
												<FormControl>
													<Input
														type="time"
														{...field}
														className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</Flex>
							)}

							{days.includes("sun") && (
								<Flex align="center" gap="2">
									<label className="whitespace-nowrap w-[100px]">
										Sunday
									</label>
									<FormField
										control={form.control}
										name="openSun"
										render={({ field }) => (
											<FormItem className="flex-1 flex items-center gap-2">
												<FormLabel>From</FormLabel>
												<FormControl>
													<Input
														type="time"
														{...field}
														className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="closeSun"
										render={({ field }) => (
											<FormItem className="flex-1 flex items-center gap-2">
												<FormLabel>To</FormLabel>
												<FormControl>
													<Input
														type="time"
														{...field}
														className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</Flex>
							)}

							{days.includes("mon") && (
								<Flex align="center" gap="2">
									<label className="whitespace-nowrap w-[100px]">
										Monday
									</label>
									<FormField
										control={form.control}
										name="openMon"
										render={({ field }) => (
											<FormItem className="flex-1 flex items-center gap-2">
												<FormLabel>From</FormLabel>
												<FormControl>
													<Input
														type="time"
														{...field}
														className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="closeMon"
										render={({ field }) => (
											<FormItem className="flex-1 flex items-center gap-2">
												<FormLabel>To</FormLabel>
												<FormControl>
													<Input
														type="time"
														{...field}
														className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</Flex>
							)}

							{days.includes("tue") && (
								<Flex align="center" gap="2">
									<label className="whitespace-nowrap w-[100px]">
										Tuesday
									</label>
									<FormField
										control={form.control}
										name="openTue"
										render={({ field }) => (
											<FormItem className="flex-1 flex items-center gap-2">
												<FormLabel>From</FormLabel>
												<FormControl>
													<Input
														type="time"
														{...field}
														className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="closeTue"
										render={({ field }) => (
											<FormItem className="flex-1 flex items-center gap-2">
												<FormLabel>To</FormLabel>
												<FormControl>
													<Input
														type="time"
														{...field}
														className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</Flex>
							)}

							{days.includes("wed") && (
								<Flex align="center" gap="2">
									<label className="whitespace-nowrap w-[100px]">
										Wednesday
									</label>
									<FormField
										control={form.control}
										name="openWed"
										render={({ field }) => (
											<FormItem className="flex-1 flex items-center gap-2">
												<FormLabel>From</FormLabel>
												<FormControl>
													<Input
														type="time"
														{...field}
														className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="closeWed"
										render={({ field }) => (
											<FormItem className="flex-1 flex items-center gap-2">
												<FormLabel>To</FormLabel>
												<FormControl>
													<Input
														type="time"
														{...field}
														className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</Flex>
							)}

							{days.includes("thu") && (
								<Flex align="center" gap="2">
									<label className="whitespace-nowrap w-[100px]">
										Thursday
									</label>
									<FormField
										control={form.control}
										name="openThu"
										render={({ field }) => (
											<FormItem className="flex-1 flex items-center gap-2">
												<FormLabel>From</FormLabel>
												<FormControl>
													<Input
														type="time"
														{...field}
														className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="closeThu"
										render={({ field }) => (
											<FormItem className="flex-1 flex items-center gap-2">
												<FormLabel>To</FormLabel>
												<FormControl>
													<Input
														type="time"
														{...field}
														className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</Flex>
							)}

							{days.includes("fri") && (
								<Flex align="center" gap="2">
									<label className="whitespace-nowrap w-[100px]">
										Friday
									</label>
									<FormField
										control={form.control}
										name="openFri"
										render={({ field }) => (
											<FormItem className="flex-1 flex items-center gap-2">
												<FormLabel>From</FormLabel>
												<FormControl>
													<Input
														type="time"
														{...field}
														className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="closeFri"
										render={({ field }) => (
											<FormItem className="flex-1 flex items-center gap-2">
												<FormLabel>To</FormLabel>
												<FormControl>
													<Input
														type="time"
														{...field}
														className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</Flex>
							)}

							<div className="mt-6 flex justify-center">
								<Button
									type="submit"
									className="w-1/3 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
								>
									Submit
								</Button>
							</div>
						</div>
					</form>
				</Form>
			</Card>
		</div>
	);
};

export default PlacesForm;
