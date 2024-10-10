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
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

import { productSchema } from "../schema";

interface props {
	id: string;
}

const EditForm = ({ id }: props) => {
	const formMethods = useForm<z.infer<typeof productSchema>>({
		resolver: zodResolver(productSchema),
	});
	const { handleSubmit, control } = formMethods;
	const onSubmit = (data: z.infer<typeof productSchema>) => {
		axios
			.put(`http://localhost:5000/api/products/update/${id}`, data)
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
					<SheetTitle>update a product</SheetTitle>
					<SheetDescription>
						Add product details here.
					</SheetDescription>
				</SheetHeader>

				<FormProvider {...formMethods}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FormField
							control={control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Product name"
										/>
									</FormControl>
									<FormDescription>
										Enter the product name.
									</FormDescription>
								</FormItem>
							)}
						/>

						<FormField
							control={control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Price</FormLabel>
									<FormControl>
										<Input
											type="number"
											{...field}
											placeholder="Price"
										/>
									</FormControl>
									<FormDescription>
										Enter the product price.
									</FormDescription>
								</FormItem>
							)}
						/>

						<FormField
							control={control}
							name="quantity"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Quantity</FormLabel>
									<FormControl>
										<Input
											type="number"
											{...field}
											placeholder="Quantity"
										/>
									</FormControl>
									<FormDescription>
										Enter the product quantity.
									</FormDescription>
								</FormItem>
							)}
						/>

						<FormField
							control={control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Product description"
										/>
									</FormControl>
									<FormDescription>
										Enter description.
									</FormDescription>
								</FormItem>
							)}
						/>

						<FormField
							control={control}
							name="picture"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Picture</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Product pic"
										/>
									</FormControl>
									<FormDescription>
										upload pic.
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

export default EditForm;
