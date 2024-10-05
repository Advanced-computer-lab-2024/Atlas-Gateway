import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

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

export const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
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

export const defaultValues = {
	name: "",
	email: "",
	username: "",
	mobileNumber: "",
	yearsOfExperience: 0,
	previousWork: "",
	profilePicture: null,
};

export default function TourGuideSheet() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	const onSubmit = () => {
		console.log("Submitted");
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
					<SheetHeader>
						<SheetTitle>
							<Label.Big600>Edit profile</Label.Big600>
						</SheetTitle>
						<SheetDescription>
							Make changes to your profile here. Click save when
							you're done.
						</SheetDescription>
					</SheetHeader>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-8"
						>
							{/* Name input */}
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name:-:-</FormLabel>
										<FormControl>
											<Input
												placeholder="John Doe"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											This is your public display Company
											name.
										</FormDescription>
									</FormItem>
								)}
							/>

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
										<FormMessage />
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
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* Years of Experience input */}
							<FormField
								control={form.control}
								name="yearsOfExperience"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Mobile Number:-</FormLabel>
										<FormControl>
											<Input
												id="yearsOfExperience"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											This is your Description
										</FormDescription>
										<FormMessage />
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
										<FormMessage />
									</FormItem>
								)}
							/>
						</form>
					</Form>

					<SheetFooter>
						<SheetClose asChild>
							<Button type="submit">Save changes</Button>
						</SheetClose>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</div>
	);
}
