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
import { useLoginStore } from "@/store/loginStore";

import { productSchema } from "../Admin/schema";

interface props {
	id?: string;
	type: string;
	sellerProduct?: string;
}

const ProductForm = ({ id, type }: props) => {
	const { user } = useLoginStore();
	const formMethods = useForm<z.infer<typeof productSchema>>({
		resolver: zodResolver(productSchema),
	});
	const { handleSubmit, control } = formMethods;

	const onSubmit = (data: z.infer<typeof productSchema>) => {
		!id
			? axios
					.post("http://localhost:5000/api/products/create", data, {
						headers: {
							userid: user?._id,
						},
					})
					.then((res) => {
						console.log(res.status);
						// will add here something to give a feedback later
					})
					.catch((error) => {
						console.log(error);
					})
			: axios
					.put(
						`http://localhost:5000/api/products/update/${id}`,
						data,
						{
							headers: {
								userid: user?._id,
							},
						},
					)
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
				<Button variant="outline">{type} Product</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>{type} a product</SheetTitle>
					<SheetDescription>
						{type} product details here.
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
							<Button type="submit">Save changes</Button>
						</SheetFooter>
					</form>
				</FormProvider>
			</SheetContent>
		</Sheet>
	);
};

export default ProductForm;
