import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	useTouristProfile,
	useUpdateTouristProfile,
} from "@/api/data/useProfile";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { currencyOptions } from "@/types/consts";
import { TTourist } from "@/types/global";

import Label from "../components/ui/Label";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../components/ui/select";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../components/ui/sheet";

// Ensure all necessary components are imported

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	mobile: z.string().min(8, {
		message: "Mobile number must be at least 8 characters.",
	}),
	currency: z.string(), // Add currency to the schema
});

export default function TouristSheet() {
	const [open, setOpen] = useState(false);
	const { data, refetch } = useTouristProfile();
	const form = useForm<TTourist>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
	});

	const { reset, getValues, formState } = form;

	useEffect(() => {
		if (data) {
			reset(data);
		}
	}, [data, reset]);

	const { doEditTouristProfile } = useUpdateTouristProfile(() => {
		refetch();
		setOpen(false);
	});

	const onSubmit = () => {
		const data = getValues();
		doEditTouristProfile(data);
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
						className="space-y-8"
						onSubmit={form.handleSubmit(onSubmit)}
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
									<FormLabel> Email</FormLabel>
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

						{/* Mobile Number input */}
						<FormField
							control={form.control}
							name="mobile"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Mobile Number</FormLabel>
									<FormControl>
										<Input id="mobile" {...field} />
									</FormControl>
									<FormDescription>
										This is your Description
									</FormDescription>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="currency"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Currency</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger>
												<SelectValue placeholder="Select currency" />
											</SelectTrigger>
											<SelectContent>
												{currencyOptions.map(
													(currency) => (
														<SelectItem
															key={currency.value}
															value={
																currency.value
															}
														>
															{currency.label}
														</SelectItem>
													),
												)}
											</SelectContent>
										</Select>
									</FormControl>
									<FormDescription>
										Select your preferred currency.
									</FormDescription>
								</FormItem>
							)}
						/>

						<SheetFooter>
							<Button
								disabled={!formState.isValid}
								onClick={onSubmit}
								type="submit"
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
