import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useUpdatePassword } from "@/api/data/useProfile";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { TPassword } from "@/types/global";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "../components/ui/sheet";

const formSchema = z
	.object({
		password: z
			.string({
				message: "Please enter a valid password",
			})
			.min(8, { message: "Password must be at least 8 characters long" }),
		confirmPassword: z
			.string({
				message: "Please confirm your password",
			})
			.min(8, { message: "Password must be at least 8 characters long" }),
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: "custom",
				message: "Password and confirm password do not match",
				path: ["confirmPassword"],
			});
		}
	});

export default function ChangePasswordSheet({
	isDrawerOpen,
	setIsDrawerOpen,
}: {
	isDrawerOpen: boolean;
	setIsDrawerOpen: (open: boolean) => void;
}) {
	const form = useForm<TPassword>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
	});

	const { getValues, formState } = form;

	const { doEditPassword } = useUpdatePassword(() => {
		setIsDrawerOpen(false);
	});

	const onSubmit = () => {
		const data = getValues();
		doEditPassword(data);
	};

	return (
		<Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
			<SheetContent>
				<Form {...form}>
					<form
						className="space-y-8"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<SheetHeader>
							<SheetTitle>Change Your Password</SheetTitle>
							<SheetDescription>
								Update Your Password then Click Save Changes
							</SheetDescription>
						</SheetHeader>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											placeholder="password"
											{...field}
											type="password"
										/>
									</FormControl>
									<FormDescription>
										Create a password to secure your
										account.
									</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input
											placeholder="password"
											{...field}
											type="password"
										/>
									</FormControl>
									<FormDescription>
										Retype your password to confirm.
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
