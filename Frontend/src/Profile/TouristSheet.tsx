import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
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
	SheetClose,
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
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	mobileNumber: z.string().min(11, {
		message: "Mobile number must be at least 11 characters.",
	}),
	walletBalance: z.number().int(),
	profilePicture: z.string().nullable(),
});

export default function TouristSheet() {
	const form = useForm<TTourist>({
		resolver: zodResolver(formSchema),
	});

	const { reset, getValues } = form;

	const { data, refetch } = useTouristProfile();

	useEffect(() => {
		if (data) {
			reset(data);
		}
	}, [data, reset]);

	const { doEditTouristProfile } = useUpdateTouristProfile(refetch);

	const onSubmit = () => {
		const data = getValues();
		doEditTouristProfile(data);
	};

	return (
		<div>
			<Sheet>
				<SheetTrigger asChild>
					<Button className="align p-6 justify-center">
						<Label.Big400>Update Profile</Label.Big400>
					</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>
							<Label.Big600>Edit profile</Label.Big600>
						</SheetTitle>
						<SheetDescription>
							Make changes to your profile here. Click save when
							you're done.
						</SheetDescription>
					</SheetHeader>
					<div className="grid grid-cols gap-4 py-4">
						{/* Profile Picture input 
                         <div className="flex-1 grid-cols-4 items-center gap-4">
                            <Label.Big300
                                className="text-left"
                            >
                                Profile Picture:-
                            </Label.Big300>
                            <Input
                                id="profilePicture"
                                type="file"
                                onChange={handleInputChange}
                                className="col-span-3 border-black"
                            />
                        </div> */}

						<Form {...form}>
							<form className="space-y-8">
								{/* Email input */}
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel> Email:-</FormLabel>
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
											<FormLabel>
												Mobile Number:-
											</FormLabel>
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
							</form>
						</Form>
					</div>
					<SheetFooter>
						<SheetClose asChild>
							<Button type="submit" onClick={onSubmit}>
								Save changes
							</Button>
						</SheetClose>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</div>
	);
}
