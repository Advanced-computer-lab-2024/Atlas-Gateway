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

import { tagOrCategorySchema } from "../schema";

interface props {
	type: string;
}

const TagAndCategoryForm = ({ type }: props) => {
	const formMethods = useForm<z.infer<typeof tagOrCategorySchema>>({
		resolver: zodResolver(tagOrCategorySchema),
	});
	const { handleSubmit, control } = formMethods;
	const onSubmit = (data: z.infer<typeof tagOrCategorySchema>) => {
		const url = type == "tag" ? "tags/preference" : "category";
		axios
			.post(`http://localhost:5000/api/${url}/create`, data)
			.then((res) => {
				console.log(res.status);
				// will add here something to give a feedback later
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
						Add {type}
					</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Add {type}</SheetTitle>
						<SheetDescription>
							Add {type} name here.
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
											<Input
												{...field}
												placeholder="name"
											/>
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
		</div>
	);
};

export default TagAndCategoryForm;
