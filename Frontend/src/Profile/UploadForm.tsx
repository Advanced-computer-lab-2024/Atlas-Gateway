import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { useUpload } from "@/api/data/useMedia";
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
} from "@/components/ui/sheet";

import { uploadSchema } from "./schema";

interface props {
	userType?: string;
	userId?: string;
	fileType: string;
	isDrawerOpen: boolean;
	setIsDrawerOpen: (open: boolean) => void;
	onUploadSuccess?: () => void;
}

const UploadForm = ({
	userType,
	userId,
	fileType,
	isDrawerOpen,
	setIsDrawerOpen,
	onUploadSuccess,
}: props) => {
	const { doUpload } = useUpload(() => {
		setIsDrawerOpen(false);
		onUploadSuccess?.();
	});
	const formMethods = useForm<z.infer<typeof uploadSchema>>({
		resolver: zodResolver(uploadSchema),
	});
	const { handleSubmit, control } = formMethods;
	const onSubmit = (data: z.infer<typeof uploadSchema>) => {
		const file = data.file;
		const payload = {
			userType: `${userType}`,
			userId: userId,
			fileType: `${fileType}`,
			file,
		};
		doUpload(payload);
		// setTimeout(() => {
		// 	onUploadSuccess?.();
		// }, 2000);
	};
	return (
		<Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
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
