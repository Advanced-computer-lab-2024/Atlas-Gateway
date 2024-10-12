import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { useAdmins, useCreateAdmin } from "@/api/data/useAdmins";
import { Button } from "@/components/ui/button";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { TAdmin } from "@/types/global";

import { accountSchema } from "../schema";

interface props {
	type: string;
}

const AddForm = ({ type }: props) => {
	const { refetch } = useAdmins();
	const { doCreateAdmin } = useCreateAdmin(refetch);
	const formMethods = useForm<z.infer<typeof accountSchema>>({
		resolver: zodResolver(accountSchema),
	});
	const { handleSubmit, control } = formMethods;

	const onSubmit = (data: TAdmin) => {
		doCreateAdmin(data);
	};
	return (
		<div>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" className="hover:bg-[#65ba2d]">
						Add {type == "admin" ? "an admin" : "a governor"}
					</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>
							Add {type == "admin" ? "an admin" : "a governor"}
						</SheetTitle>
						<SheetDescription>
							Add {type} details here.
						</SheetDescription>
					</SheetHeader>
					<FormProvider {...formMethods}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<FormField
								control={control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>username</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="username"
											/>
										</FormControl>
										<FormDescription>
											Enter the username.
										</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>email</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="email"
												type="email"
											/>
										</FormControl>
										<FormDescription>
											Enter the email.
										</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>password</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="password"
												type="password"
											/>
										</FormControl>
										<FormDescription>
											Enter the password.
										</FormDescription>
									</FormItem>
								)}
							/>
							<SheetFooter>
								<SheetClose asChild>
									<Button type="submit">Save changes</Button>
								</SheetClose>
							</SheetFooter>
						</form>
					</FormProvider>
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default AddForm;
