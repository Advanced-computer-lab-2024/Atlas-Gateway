import { useFormContext } from "react-hook-form";

import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { TRegisterForm } from "../types";

export default function AccountInfo() {
	const form = useFormContext<TRegisterForm>();
	return (
		<>
			<FormField
				control={form.control}
				name="username"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Username</FormLabel>
						<FormControl>
							<Input placeholder="Username" {...field} />
						</FormControl>
						<FormDescription>
							This is your public display name
						</FormDescription>
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="email"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Email</FormLabel>
						<FormControl>
							<Input placeholder="Email" {...field} />
						</FormControl>
						<FormDescription>
							This is the email that will be used to contact you.
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
							Create a password to secure your account.
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
		</>
	);
}
