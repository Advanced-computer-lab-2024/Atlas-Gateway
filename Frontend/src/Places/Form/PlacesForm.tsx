import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useUpload } from "@/api/data/useMedia";
import {
	useCreatePlace,
	usePlaces,
	useUpdatePlace,
} from "@/api/data/usePlaces";
import { useTags } from "@/api/data/useTags";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Flex } from "@/components/ui/flex";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
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
import { Textarea } from "@/components/ui/textarea";
import { TPlace } from "@/types/global";

import { formSchema } from "./schema";

const PlaceForm = ({
	open,
	setOpen,
	place,
	onUploadSuccess,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
	place?: TPlace;
	userType?: string;
	userId?: string;
	fileType?: string;
	onUploadSuccess?: () => void;
}) => {
	const form = useForm<TPlace>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			tags: [],
			openingHours: {
				saturday: {
					open: "",
					close: "",
					dayOff: false,
				},
				sunday: {
					open: "",
					close: "",
					dayOff: false,
				},
				monday: {
					open: "",
					close: "",
					dayOff: false,
				},
				tuesday: {
					open: "",
					close: "",
					dayOff: false,
				},
				wednesday: {
					open: "",
					close: "",
					dayOff: false,
				},
				thursday: {
					open: "",
					close: "",
					dayOff: false,
				},
				friday: {
					open: "",
					close: "",
					dayOff: false,
				},
			},
		},
	});
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const filesArray = Array.from(e.target.files || []);
		setSelectedFiles(filesArray);
	};
	const { doUpload } = useUpload(() => {
		refetch();
	});
	const { reset, watch } = form;
	const { data: tags } = useTags();
	const { refetch } = usePlaces();
	const { doCreatePlace } = useCreatePlace((response) => {
		const createdPlaceId = response.data._id;
		selectedFiles.forEach((file) => {
			const payload = {
				userType: "place",
				userId: createdPlaceId,
				fileType: "none",
				file,
			};
			doUpload(payload);
		});
		refetch();
		form.reset();
	});
	const { doUpdatePlace } = useUpdatePlace(() => {
		refetch();
		form.reset();
	});
	const handleSubmit = (values: TPlace) => {
		if (place) {
			doUpdatePlace({ ...place, ...values });
		} else {
			doCreatePlace(values);
		}
		setOpen(false);
	};

	useEffect(() => {
		if (place) {
			reset({
				...place,
				// @ts-expect-error Add unique types for form later
				tags: place?.tags?.map((tag) => tag._id),
			});
		}
	}, [place, reset]);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetContent className="sm:max-w-[600px]">
				<SheetHeader>
					<SheetTitle>
						{place ? "Edit Place" : "Add Place"}
					</SheetTitle>
				</SheetHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="flex gap-8 flex-col"
					>
						<Flex
							isColumn
							gap="4"
							className="overflow-y-scroll h-[84vh]"
						>
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
							<Map
								setLocation={(location) => {
									form.setValue("location", location);
								}}
							/>
							<FormField
								control={form.control}
								name="location"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Location</FormLabel>
										<FormControl>
											<Input
												placeholder="Location"
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
							<h3 className="text-lg font-medium mt-4">
								Ticket Prices
							</h3>
							<Flex gap="4" className="w-full">
								<FormField
									control={form.control}
									name="ticketPrices.foreigner"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Foreigners</FormLabel>
											<FormControl>
												<Input
													placeholder="Price for foreigners"
													{...field}
													type="number"
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
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="ticketPrices.native"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Natives</FormLabel>
											<FormControl>
												<Input
													placeholder="Price for natives"
													{...field}
													type="number"
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
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="ticketPrices.student"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Students</FormLabel>
											<FormControl>
												<Input
													placeholder="Price for students"
													{...field}
													type="number"
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
											<FormMessage />
										</FormItem>
									)}
								/>
							</Flex>
							<h2 className="text-lg font-medium mt-4">
								Opening Hours
							</h2>
							<Flex align="center" gap="2" className="w-full">
								<label className="whitespace-nowrap w-[100px]">
									Saturday:
								</label>
								<FormField
									control={form.control}
									name="openingHours.saturday.open"
									render={({ field }) => (
										<FormItem className="">
											<FormLabel>From</FormLabel>
											<FormControl>
												<Input
													type="time"
													{...field}
													disabled={watch(
														"openingHours.saturday.dayOff",
													)}
													onChange={(e) =>
														field.onChange(
															e.target.value.toString(),
														)
													}
													className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="openingHours.saturday.close"
									render={({ field }) => (
										<FormItem className="">
											<FormLabel>To</FormLabel>
											<FormControl>
												<Input
													type="time"
													{...field}
													disabled={watch(
														"openingHours.saturday.dayOff",
													)}
													onChange={(e) =>
														field.onChange(
															e.target.value.toString(),
														)
													}
													className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="openingHours.saturday.dayOff"
									render={({ field }) => (
										<FormItem className="flex flex-col gap-2">
											<FormLabel>Off?</FormLabel>
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={
														field.onChange
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</Flex>
							<Flex align="center" gap="2" className="w-full">
								<label className="whitespace-nowrap w-[100px]">
									Sunday
								</label>
								<FormField
									control={form.control}
									name="openingHours.sunday.open"
									render={({ field }) => (
										<FormItem className="">
											<FormLabel>From</FormLabel>
											<FormControl>
												<Input
													type="time"
													{...field}
													disabled={watch(
														"openingHours.sunday.dayOff",
													)}
													onChange={(e) =>
														field.onChange(
															e.target.value.toString(),
														)
													}
													className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="openingHours.sunday.close"
									render={({ field }) => (
										<FormItem className="">
											<FormLabel>To</FormLabel>
											<FormControl>
												<Input
													type="time"
													{...field}
													disabled={watch(
														"openingHours.sunday.dayOff",
													)}
													onChange={(e) =>
														field.onChange(
															e.target.value.toString(),
														)
													}
													className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="openingHours.sunday.dayOff"
									render={({ field }) => (
										<FormItem className="flex flex-col gap-2">
											<FormLabel>Off?</FormLabel>
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={
														field.onChange
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</Flex>
							<Flex align="center" gap="2" className="w-full">
								<label className="whitespace-nowrap w-[100px]">
									Monday
								</label>
								<FormField
									control={form.control}
									name="openingHours.monday.open"
									render={({ field }) => (
										<FormItem className="">
											<FormLabel>From</FormLabel>
											<FormControl>
												<Input
													type="time"
													{...field}
													disabled={watch(
														"openingHours.monday.dayOff",
													)}
													onChange={(e) =>
														field.onChange(
															e.target.value.toString(),
														)
													}
													className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="openingHours.monday.close"
									render={({ field }) => (
										<FormItem className="">
											<FormLabel>To</FormLabel>
											<FormControl>
												<Input
													type="time"
													{...field}
													disabled={watch(
														"openingHours.monday.dayOff",
													)}
													onChange={(e) =>
														field.onChange(
															e.target.value.toString(),
														)
													}
													className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="openingHours.monday.dayOff"
									render={({ field }) => (
										<FormItem className="flex flex-col gap-2">
											<FormLabel>Off?</FormLabel>
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={
														field.onChange
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</Flex>
							<Flex align="center" gap="2" className="w-full">
								<label className="whitespace-nowrap w-[100px]">
									Tuesday
								</label>
								<FormField
									control={form.control}
									name="openingHours.tuesday.open"
									render={({ field }) => (
										<FormItem className="">
											<FormLabel>From</FormLabel>
											<FormControl>
												<Input
													type="time"
													{...field}
													disabled={watch(
														"openingHours.tuesday.dayOff",
													)}
													onChange={(e) =>
														field.onChange(
															e.target.value.toString(),
														)
													}
													className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="openingHours.tuesday.close"
									render={({ field }) => (
										<FormItem className="">
											<FormLabel>To</FormLabel>
											<FormControl>
												<Input
													type="time"
													{...field}
													disabled={watch(
														"openingHours.tuesday.dayOff",
													)}
													onChange={(e) =>
														field.onChange(
															e.target.value.toString(),
														)
													}
													className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="openingHours.tuesday.dayOff"
									render={({ field }) => (
										<FormItem className="flex flex-col gap-2">
											<FormLabel>Off?</FormLabel>
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={
														field.onChange
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</Flex>
							<Flex align="center" gap="2" className="w-full">
								<label className="whitespace-nowrap w-[100px]">
									Wednesday
								</label>
								<FormField
									control={form.control}
									name="openingHours.wednesday.open"
									render={({ field }) => (
										<FormItem className="">
											<FormLabel>From</FormLabel>
											<FormControl>
												<Input
													type="time"
													{...field}
													disabled={watch(
														"openingHours.wednesday.dayOff",
													)}
													onChange={(e) =>
														field.onChange(
															e.target.value.toString(),
														)
													}
													className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="openingHours.wednesday.close"
									render={({ field }) => (
										<FormItem className="">
											<FormLabel>To</FormLabel>
											<FormControl>
												<Input
													type="time"
													{...field}
													disabled={watch(
														"openingHours.wednesday.dayOff",
													)}
													onChange={(e) =>
														field.onChange(
															e.target.value.toString(),
														)
													}
													className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="openingHours.wednesday.dayOff"
									render={({ field }) => (
										<FormItem className="flex flex-col gap-2">
											<FormLabel>Off?</FormLabel>
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={
														field.onChange
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</Flex>
							<Flex align="center" gap="2" className="w-full">
								<label className="whitespace-nowrap w-[100px]">
									Thursday
								</label>
								<FormField
									control={form.control}
									name="openingHours.thursday.open"
									render={({ field }) => (
										<FormItem className="">
											<FormLabel>From</FormLabel>
											<FormControl>
												<Input
													type="time"
													{...field}
													disabled={watch(
														"openingHours.thursday.dayOff",
													)}
													onChange={(e) =>
														field.onChange(
															e.target.value.toString(),
														)
													}
													className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="openingHours.thursday.close"
									render={({ field }) => (
										<FormItem className="">
											<FormLabel>To</FormLabel>
											<FormControl>
												<Input
													type="time"
													{...field}
													disabled={watch(
														"openingHours.thursday.dayOff",
													)}
													onChange={(e) =>
														field.onChange(
															e.target.value.toString(),
														)
													}
													className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="openingHours.thursday.dayOff"
									render={({ field }) => (
										<FormItem className="flex flex-col gap-2">
											<FormLabel>Off?</FormLabel>
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={
														field.onChange
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</Flex>
							<Flex align="center" gap="2" className="w-full">
								<label className="whitespace-nowrap w-[100px]">
									Friday
								</label>
								<FormField
									control={form.control}
									name="openingHours.friday.open"
									render={({ field }) => (
										<FormItem className="">
											<FormLabel>From</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="time"
													disabled={watch(
														"openingHours.friday.dayOff",
													)}
													onChange={(e) =>
														field.onChange(
															e.target.value.toString(),
														)
													}
													className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="openingHours.friday.close"
									render={({ field }) => (
										<FormItem className="">
											<FormLabel>To</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="time"
													disabled={watch(
														"openingHours.friday.dayOff",
													)}
													onChange={(e) =>
														field.onChange(
															e.target.value.toString(),
														)
													}
													className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="openingHours.friday.dayOff"
									render={({ field }) => (
										<FormItem className="flex flex-col gap-2">
											<FormLabel>Off?</FormLabel>
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={
														field.onChange
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="files"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Upload files</FormLabel>
											<FormControl>
												<input
													type="file"
													multiple
													onChange={(e) => {
														field.onChange(
															Array.from(
																e.target
																	.files ||
																	[],
															),
														);
														handleFileChange(e);
													}}
												/>
											</FormControl>
											<FormDescription>
												Upload your files here.
											</FormDescription>
										</FormItem>
									)}
								/>
							</Flex>
						</Flex>
						<SheetFooter>
							<Button type="submit" className="w-40 h-10">
								{place ? "Update" : "Create"} Place
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
};

export default PlaceForm;
