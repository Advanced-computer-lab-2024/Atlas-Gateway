import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { useLogin } from "@/api/data/useLogin";
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

import { loginSchema } from "./schema";
import { TLoginForm } from "./types";

export default function Login() {
	const { doLogin } = useLogin();

	const form = useForm<TLoginForm>({
		resolver: zodResolver(loginSchema),
		mode: "onChange",
	});

	const { handleSubmit } = form;

	const onSubmit = async (data: TLoginForm) => {
		doLogin(data);
	};

	return (
		<div className="grid place-items-center items-center place-content-center w-full h-full">
			<Card className="w-[500px] h-[450px] rounded-lg border-black shadow-xl p-6">
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
								Don't have an account{" "}
								<Link to="/register" className="text-primary">
									Register
								</Link>
							</Flex>
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
											Enter your account password.
										</FormDescription>
									</FormItem>
								)}
							/>
							<Button size="lg" type="submit">
								Login
							</Button>
						</Flex>
					</form>
				</Form>
			</Card>
		</div>
	);
}
