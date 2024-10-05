import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
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

import { tagOrCategorySchema } from "../schema";

interface props {
	type: string;
	id: string;
}

const EditForm = ({ type, id }: props) => {
	const formMethods = useForm<z.infer<typeof tagOrCategorySchema>>({
		resolver: zodResolver(tagOrCategorySchema),
	});
	const { handleSubmit, control } = formMethods;
	const onSubmit = (data: z.infer<typeof tagOrCategorySchema>) => {
		const url = type == "tag" ? "tags/preference" : "category";
		axios
			.put(`http://localhost:5000/api/${url}/update/${id}`, data)
			.then((res) => {
				console.log(res.status);
				// will add here something to give a feedback later
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<Sheet>
			<SheetTrigger asChild>
				<button className="bg-blue-500 text-white rounded-full p-2 shadow-lg hover:bg-blue-600">
					<Pencil className="w-4 h-4" />
				</button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>update {type}</SheetTitle>
					<SheetDescription>
						update {type} name here.
					</SheetDescription>
				</SheetHeader>
				<FormProvider {...formMethods}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FormField
							control={control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{type} name</FormLabel>
									<FormControl>
										<Input {...field} placeholder="name" />
									</FormControl>
									<FormDescription>
										Enter {type} name.
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
	);
};

export default EditForm;
