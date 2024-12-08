import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useUpdatePassword } from "@/api/data/useProfile";
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
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { TOtp, TPassword } from "@/types/global";

import { otpSchema } from "./schema";

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

export default function ForgetPasswordSheet({
	isDrawerOpen,
	setIsDrawerOpen,
	otp,
}: {
	isDrawerOpen: boolean;
	setIsDrawerOpen: (open: boolean) => void;
	otp: string;
}) {
	const [verifyOtp, setVerifyOtp] = useState(false);
	const otpForm = useForm<TOtp>({
		resolver: zodResolver(otpSchema),
		mode: "onChange",
	});

	const { getValues: getOtpValues, formState: otpFormState } = otpForm;

	const otpOnSubmit = () => {
		const data = getOtpValues();
		if (data.otp == otp) {
			setVerifyOtp(true);
		}
	};

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
				{!verifyOtp && (
					<Form {...otpForm}>
						<form
							className="space-y-8"
							onSubmit={otpForm.handleSubmit(otpOnSubmit)}
						>
							<SheetHeader>
								<SheetTitle>Reset Your Password</SheetTitle>
								<SheetDescription>
									Update Your Password then Click Save Changes
								</SheetDescription>
							</SheetHeader>
							<FormField
								control={otpForm.control}
								name="otp"
								render={({ field }) => (
									<FormItem>
										<FormLabel>One-Time Password</FormLabel>
										<FormControl>
											<InputOTP maxLength={6} {...field}>
												<InputOTPGroup>
													<InputOTPSlot index={0} />
													<InputOTPSlot index={1} />
													<InputOTPSlot index={2} />
													<InputOTPSlot index={3} />
													<InputOTPSlot index={4} />
													<InputOTPSlot index={5} />
												</InputOTPGroup>
											</InputOTP>
										</FormControl>
										<FormDescription>
											Please enter the one-time password
											sent to your email.
										</FormDescription>
									</FormItem>
								)}
							/>
							<SheetFooter>
								<Button
									disabled={!otpFormState.isValid}
									onClick={otpOnSubmit}
									type="submit"
								>
									Verify
								</Button>
							</SheetFooter>
						</form>
					</Form>
				)}
				{verifyOtp && (
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
				)}
			</SheetContent>
		</Sheet>
	);
}
