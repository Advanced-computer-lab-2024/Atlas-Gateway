import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";



import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { TAdvetisor } from "@/types/global";



import Label from "../components/ui/Label";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import { useAdvertiserProfile, useUpdateAdvertiserProfile } from "@/api/data/useProfile";
import { useEffect } from "react";


export const formSchema = z.object({
	companyName: z.string().min(2, {
		message: "Company Name must be at least 2 characters.",
	}),
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	hotline: z.string().min(11, {
		message: "Hotline must be at least 11 characters.",
	}),
	website: z.string().url({
		message: "Please enter a valid URL.",
	}),
	description: z.string().min(2, {
		message: "Description must be at least 2 characters.",
	}),
	profilePicture: z.string().nullable(),
});



export default function AdvertiserSheet() {

	const form = useForm<TAdvetisor>({
		resolver: zodResolver(formSchema),
	});

	const { reset, getValues } = form;
    const { data, refetch } = useAdvertiserProfile();
	

	useEffect(() => {
		if (data) {
			reset(data);
		}
	}, [data, reset]);

	const { doEditAdvertiserProfile } = useUpdateAdvertiserProfile(refetch);

	const onSubmit = () => {
		const data = getValues();
		doEditAdvertiserProfile(data);
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
								name="companyName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Company Name:-:-</FormLabel>
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
									</FormItem>
								)}
							/>

							{/* Hotline input */}
							<FormField
								control={form.control}
								name="hotline"
								render={({ field }) => (
									<FormItem>
										<FormLabel> Hotline:-</FormLabel>
										<FormControl>
											<Input
												placeholder="911"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											This is your email.
										</FormDescription>
									</FormItem>
								)}
							/>

							{/* Website input */}
							<FormField
								control={form.control}
								name="website"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Website:-</FormLabel>
										<FormControl>
											<Input
												placeholder="https://example.com"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											This is your email.
										</FormDescription>
									</FormItem>
								)}
							/>

							{/* Description input */}
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description:-</FormLabel>
										<FormControl>
											<Textarea
												id="description"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											This is your Description
										</FormDescription>
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