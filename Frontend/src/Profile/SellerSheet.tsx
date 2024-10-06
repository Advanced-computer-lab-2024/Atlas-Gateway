import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	useSellerProfile,
	useUpdateSellerProfile,
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
import { TSeller } from "@/types/global";

import Label from "../components/ui/Label";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../components/ui/sheet";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	description: z.string().min(2, {
		message: "Description must be at least 2 characters.",
	}),
});

export default function SellerSheet() {
	const [open, setOpen] = useState(false);
	const form = useForm<TSeller>({
		resolver: zodResolver(formSchema),
	});

	const { reset, getValues, formState } = form;
	const { data, refetch } = useSellerProfile();

	useEffect(() => {
		if (data) {
			reset(data);
		}
	}, [data, reset]);

	const { doEditSellerProfile } = useUpdateSellerProfile(() => {
		refetch();
		setOpen(false);
	});

	const onSubmit = () => {
		const data = getValues();
		doEditSellerProfile(data);
	};

	return (
		<Sheet open={open} onOpenChange={setOpen}>
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
								Make changes to your profile here. Click save
								when you're done.
							</SheetDescription>
						</SheetHeader>

						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											placeholder="John Doe"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										This is your name.
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
									<FormLabel>Email</FormLabel>
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

						{/* Description input */}
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea id="description" {...field} />
									</FormControl>
									<FormDescription>
										This is your Description
									</FormDescription>
								</FormItem>
							)}
						/>
						<SheetFooter>
								<Button
									type="submit"
									disabled={!formState.isValid}
									onClick={onSubmit}
								>
									Save changes
								</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
}
