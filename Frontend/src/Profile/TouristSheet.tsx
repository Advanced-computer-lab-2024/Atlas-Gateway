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
import { TTourist } from "@/types/global";

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
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	mobileNumber: z.string().min(11, {
		message: "Mobile number must be at least 11 characters.",
	}),
	walletBalance: z.number().int(),
	profilePicture: z.string().nullable(),
});

export default function TouristSheet() {
	const [open, setOpen] = useState(false);
	const form = useForm<TTourist>({
		resolver: zodResolver(formSchema),
	});

	const { reset, getValues, formState } = form;
	const { data, refetch } = useTouristProfile();

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
							name="mobileNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Mobile Number</FormLabel>
									<FormControl>
										<Input
											placeholder="0123456789"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										This is your Mobile Number
									</FormDescription>
								</FormItem>
							)}
						/>
						<SheetFooter>
							<Button disabled={!formState.isValid} type="submit">
								Save changes
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
}
