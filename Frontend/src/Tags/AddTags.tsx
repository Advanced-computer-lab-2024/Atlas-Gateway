import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

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
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

import { tagSchema } from "./schema"; 

const AddTags = () => {
	const formMethods = useForm<z.infer<typeof tagSchema>>({
		resolver: zodResolver(tagSchema),
	});
	const { handleSubmit, control } = formMethods;

	const onSubmit = (data: z.infer<typeof tagSchema>) => {
		axios
			.post(`http://localhost:5000/api/tags/historical/create`, data)
			.then((res) => {
				console.log(res.status);
				// Add feedback logic here
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="flex self-end pb-3">
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" className="hover:bg-[#65ba2d]">
						Add Tag
					</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Add Tag</SheetTitle>
						<SheetDescription>
							Add tag details here.
						</SheetDescription>
					</SheetHeader>
					<FormProvider {...formMethods}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<FormField
								control={control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tag name</FormLabel>
										<FormControl>
											<Input {...field} placeholder="name" />
										</FormControl>
										<FormDescription>
											Enter tag name.
										</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="category"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Type</FormLabel>
										<FormControl>
											<Input {...field} placeholder="category" />
										</FormControl>
										<FormDescription>
											Enter a Type.
										</FormDescription>
									</FormItem>
								)}
							/>
							<SheetFooter>
								<Button type="submit">Save changes</Button>
							</SheetFooter>
						</form>
					</FormProvider>
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default AddTags;
