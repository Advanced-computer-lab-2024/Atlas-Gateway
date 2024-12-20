import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	useAdvertiserProfile,
	useUpdateAdvertiserProfile,
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
import { TAdvetisor } from "@/types/global";

import Label from "../../components/ui/Label";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../../components/ui/sheet";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	hotline: z.string().min(4, {
		message: "Hotline must be at least 4 characters.",
	}),
	website: z.string().url({
		message: "Please enter a valid URL.",
	}),
	description: z.string().min(2, {
		message: "Description must be at least 2 characters.",
	}),
});

export default function AdvertiserSheet({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
}) {
	const form = useForm<TAdvetisor>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
	});

	const { reset, getValues, formState } = form;
	const { data, refetch } = useAdvertiserProfile();

	useEffect(() => {
		if (data) {
			reset(data);
		}
	}, [data, reset]);

	const { doEditAdvertiserProfile } = useUpdateAdvertiserProfile(() => {
		refetch();
		setOpen(false);
	});

	const onSubmit = () => {
		const data = getValues();
		doEditAdvertiserProfile(data);
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

						{/* Hotline input */}
						<FormField
							control={form.control}
							name="hotline"
							render={({ field }) => (
								<FormItem>
									<FormLabel> Hotline</FormLabel>
									<FormControl>
										<Input placeholder="911" {...field} />
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
									<FormLabel>Website</FormLabel>
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

						{/* Company Profile input */}
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Company Profile</FormLabel>
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
