import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
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
		const filePath = `${type}/${username}`;
		const payload = {
			filePath,
			file,
		};
		doUpload(payload);
	};
	return (
		<Sheet>
			<SheetTrigger asChild>
				<button className="font-bold">
					{type == "product" ? (
						<Camera className="w-full h-28" />
					) : (
						"Upload Documents"
					)}
				</button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Upload</SheetTitle>
					<SheetDescription>upload file here.</SheetDescription>
				</SheetHeader>
				<FormProvider {...formMethods}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FormField
							control={control}
							name="file"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Upload file</FormLabel>
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
										Upload your file here.
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
