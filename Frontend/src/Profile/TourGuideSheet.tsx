import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	useTourGuideProfile,
	useUpdateTourGuideProfile,
} from "@/api/data/useProfile";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { TTourGuide } from "@/types/global";

import Label from "../components/ui/Label";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../components/ui/sheet";

const formSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	mobileNumber: z.string().min(11, {
		message: "Mobile number must be at least 11 characters.",
	}),
	yearsOfExperience: z.number().int(),
	previousWork: z.string().min(2, {
		message: "Previous work must be at least 2 characters.",
	}),
	profilePicture: z.string().nullable(),
});

export default function TourGuideSheet() {
	const form = useForm<TTourGuide>({
		resolver: zodResolver(formSchema),
	});

	const { reset, getValues } = form;
	const { data, refetch } = useTourGuideProfile();

	useEffect(() => {
		if (data) {
			reset(data);
		}
	}, [data, reset]);

	const { doEditTourGuideProfile } = useUpdateTourGuideProfile(refetch);

	const onSubmit = () => {
		const data = getValues();
		doEditTourGuideProfile(data);
	};

	return (
		<div>
			<Sheet>
				<SheetTrigger asChild>
					<Button className="align p-6 justify-center">
						<Label.Big400>Update Profile</Label.Big400>
					</Button>
				</SheetTrigger>
				<SheetContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-8"
						>
							<SheetHeader>
								<SheetTitle>
									<Label.Big600>Edit profile</Label.Big600>
								</SheetTitle>
								<SheetDescription>
									Make changes to your profile here. Click
									save when you're done.
								</SheetDescription>
							</SheetHeader>
							{/* Email input */}
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel> Email:-</FormLabel>
										<FormControl>
											<Input
												placeholder="joedoe123@gamil.com"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											This is your email.
										</FormDescription>
									</FormItem>
								)}
							/>

							{/* Mobile Number*/}
							<FormField
								control={form.control}
								name="mobileNumber"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Mobile Number:-</FormLabel>
										<FormControl>
											<Input
												id="mobileNumber"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											This is your Description
										</FormDescription>
									</FormItem>
								)}
							/>
							{/* Years of Experience input */}
							<FormField
								control={form.control}
								name="yearsOfExperience"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Year Of Experience:-
										</FormLabel>
										<FormControl>
											<Input
												id="yearsOfExperience"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											This is your Description
										</FormDescription>
									</FormItem>
								)}
							/>

							{/* Description input */}
							<FormField
								control={form.control}
								name="previousWork"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description:-</FormLabel>
										<FormControl>
											<Textarea
												id="previousWork"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											This is your Description
										</FormDescription>
									</FormItem>
								)}
							/>
							<SheetFooter>
								<SheetClose asChild>
									<Button type="submit">Save changes</Button>
								</SheetClose>
							</SheetFooter>
						</form>
					</Form>
				</SheetContent>
			</Sheet>
		</div>
	);
}
