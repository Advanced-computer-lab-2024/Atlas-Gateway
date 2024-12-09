import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useForgetPassword, useUpdatePassword } from "@/api/data/useProfile";
import Label from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";
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

import { step1, step2, step3 } from "./schema";
import { TForgetPasswordForm } from "./types";

export default function ForgetPassword() {
	const navigate = useNavigate();
	const [step, setStep] = useState(1);
	const form = useForm<TForgetPasswordForm>({
		resolver: zodResolver(
			{
				1: step1,
				2: step2,
				3: step3,
			}?.[step] ?? step1,
		),
		mode: "onChange",
	});

	const { handleSubmit } = form;
	const [otp, setOtp] = useState("");
	const { doForgetPassword } = useForgetPassword((response) => {
		setStep(2);
		setOtp(response.data);
	});
	const { doEditPassword } = useUpdatePassword(() => {
		navigate("/login");
	});

	const onSubmit = async (data: TForgetPasswordForm) => {
		if (step === 1) {
			doForgetPassword(data.email);
		}
		if (step === 2) {
			if (data.otp == otp) {
				console.log(data.otp, otp);
				setStep(3);
			}
		}
		if (step === 3) {
			doEditPassword({
				username: data.username,
				password: data.password,
				confirmPassword: data.confirmPassword,
			});
		}
	};

	return (
		<div className="grid place-items-center items-center place-content-center w-full h-full">
			<Card className="w-[500px] min-h-[300px] rounded-lg border-black shadow-xl p-6">
				<Form {...form}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-8"
					>
						<Flex
							isColumn
							gap="4"
							justify="center"
							className="h-full"
						>
							<Label.Big700
								variant="primary"
								className="self-center font-[pacifico]"
							>
								Atlas Gateway
							</Label.Big700>
							<Flex gap="1" className="self-center">
								Forgot password?
								<Link to="/register" className="text-primary">
									Register
								</Link>
							</Flex>
							<Flex gap="1" className="self-center">
								<Flex gap="2">
									<Link
										to="/register"
										className="text-primary"
									>
										Register
									</Link>
									or
									<Link to="/login" className="text-primary">
										Login
									</Link>
								</Flex>
							</Flex>
							{step === 1 && (
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													placeholder="email"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												Enter your account email.
											</FormDescription>
										</FormItem>
									)}
								/>
							)}
							{step === 2 && (
								<FormField
									control={form.control}
									name="otp"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												One-Time Password
											</FormLabel>
											<FormControl>
												<InputOTP
													maxLength={6}
													{...field}
													onChange={(value) => {
														form.setValue(
															"otp",
															value,
														);
													}}
												>
													<InputOTPGroup>
														<InputOTPSlot
															index={0}
														/>
														<InputOTPSlot
															index={1}
														/>
														<InputOTPSlot
															index={2}
														/>
														<InputOTPSlot
															index={3}
														/>
														<InputOTPSlot
															index={4}
														/>
														<InputOTPSlot
															index={5}
														/>
													</InputOTPGroup>
												</InputOTP>
											</FormControl>
											<FormDescription>
												Please enter the one-time
												password sent to your email.
											</FormDescription>
										</FormItem>
									)}
								/>
							)}
							{step === 3 && (
								<>
									<FormField
										control={form.control}
										name="username"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Username</FormLabel>
												<FormControl>
													<Input
														placeholder="Username"
														{...field}
													/>
												</FormControl>
												<FormDescription>
													Enter your account username.
												</FormDescription>
											</FormItem>
										)}
									/>
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
													Create a password to secure
													your account.
												</FormDescription>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="confirmPassword"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Confirm Password
												</FormLabel>
												<FormControl>
													<Input
														placeholder="password"
														{...field}
														type="password"
													/>
												</FormControl>
												<FormDescription>
													Retype your password to
													confirm.
												</FormDescription>
											</FormItem>
										)}
									/>
								</>
							)}
							<Button size="lg" type="submit">
								{
									{
										1: "Send OTP",
										2: "Verify OTP",
										3: "Reset Password",
									}[step]
								}
							</Button>
						</Flex>
					</form>
				</Form>
			</Card>
		</div>
	);
}
