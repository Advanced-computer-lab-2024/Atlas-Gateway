import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { useUpload } from "@/api/data/useRegister";
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

import { uploadSchema } from "./schema";

interface props {
	username?: string;
	type?: string;
}

const UploadForm = ({ username, type }: props) => {
	const { doUpload } = useUpload();
	const formMethods = useForm<z.infer<typeof uploadSchema>>({
		resolver: zodResolver(uploadSchema),
	});
	const { handleSubmit, control } = formMethods;
	const onSubmit = (data: z.infer<typeof uploadSchema>) => {
		const file = data.file;
		const payload = {
			username: username || "",
			type: type || "",
			file,
		};
		doUpload(payload);
	};
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button className="align p-6 justify-center">
					<p>Update Account</p>
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>update</SheetTitle>
					<SheetDescription>update name here.</SheetDescription>
				</SheetHeader>
				<FormProvider {...formMethods}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FormField
							control={control}
							name="file"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Upload ID</FormLabel>
									<FormControl>
										<input
											type="file"
											onChange={(e) =>
												field.onChange(
													e.target.files?.[0],
												)
											}
										/>
									</FormControl>
									<FormDescription>
										Upload your ID file here.
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
	);
};

export default UploadForm;
