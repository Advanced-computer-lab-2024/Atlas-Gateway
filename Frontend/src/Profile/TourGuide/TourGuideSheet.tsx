import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	useTourGuideProfile,
	useUpdateTourGuideProfile,
} from "@/api/data/useProfile";
import Label from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import {
	Form,
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
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { TTourGuide } from "@/types/global";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	mobile: z.string().min(11, {
		message: "Mobile number must be at least 11 characters.",
	}),
	experience: z.coerce.number(),
	prevWork: z.string().min(2, {
		message: "Previous work must be at least 2 characters.",
	}),
});

export default function TourGuideSheet({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
}) {
	const { data, refetch } = useTourGuideProfile();

	const form = useForm<TTourGuide>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
	});
	const { reset, getValues, formState } = form;

	useEffect(() => {
		if (data) {
			reset(data);
		}
	}, [data, reset]);

	const { doEditTourGuideProfile } = useUpdateTourGuideProfile(() => {
		refetch();
		setOpen(false);
	});

	const onSubmit = () => {
		const data = getValues();
		doEditTourGuideProfile(data);
	};

	return (
		<Sheet open={open} onOpenChange={setOpen}>
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

						{/* Mobile Number*/}
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
						{/* Years of Experience input */}
						<FormField
							control={form.control}
							name="experience"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Year Of Experience</FormLabel>
									<FormControl>
										<Input
											type="number"
											id="experience"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Update Your Years of Experience
									</FormDescription>
								</FormItem>
							)}
						/>

						{/* Description input */}
						<FormField
							control={form.control}
							name="prevWork"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Previous Work Experience
									</FormLabel>
									<FormControl>
										<Textarea id="prevWork" {...field} />
									</FormControl>
									<FormDescription>
										Update your Previous Work Experience
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
