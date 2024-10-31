import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { useCategories, useCreateCategory } from "@/api/data/useCategories";
import { useCreateTag, useTags } from "@/api/data/useTags";
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

import { tagOrCategorySchema } from "../schema";

interface props {
	type: string;
}

const TagAndCategoryForm = ({ type }: props) => {
	const { refetch: tagRefetch } = useTags();
	const { refetch: categoryRefetch } = useCategories();
	const { doCreateTag } = useCreateTag(tagRefetch);
	const { doCreateCategory } = useCreateCategory(categoryRefetch);
	const formMethods = useForm<z.infer<typeof tagOrCategorySchema>>({
		resolver: zodResolver(tagOrCategorySchema),
	});
	const { handleSubmit, control } = formMethods;
	const onSubmit = (data: z.infer<typeof tagOrCategorySchema>) => {
		const url = type == "tag" ? "tags/preference" : "category";
		if (url == "tags/preference") {
			doCreateTag(data);
		} else if (url == "category") {
			doCreateCategory(data);
		}
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

export default TagAndCategoryForm;
