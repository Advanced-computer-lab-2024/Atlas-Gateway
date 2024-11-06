import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { useUpload } from "@/api/data/useMedia";
import {
	useCreateProduct,
	useProducts,
	useUpdateProduct,
} from "@/api/data/useProducts";
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

import { productSchema } from "../Admin/schema";

interface props {
	id?: string;
	type: string;
	sellerProduct?: string;
}

const ProductForm = ({ id, type }: props) => {
	const formMethods = useForm<z.infer<typeof productSchema>>({
		resolver: zodResolver(productSchema),
	});
	const { handleSubmit, control } = formMethods;
	const [file, setFile] = useState<File | null>(null);
	const { refetch } = useProducts();
	const { doUpload } = useUpload(() => {
		refetch();
	});
	const { doCreateProduct } = useCreateProduct((response) => {
		const createdProductId = response.data._id;
		const payload = {
			userType: "product",
			userId: createdProductId,
			fileType: "image",
			file,
		};
		doUpload(payload);
		refetch();
		formMethods.reset();
	});

	const { doUpdateProduct } = useUpdateProduct(() => {
		refetch();
		formMethods.reset();
	});

	const onSubmit = (data: z.infer<typeof productSchema>) => {
		if (!id) {
			setFile(data.file!);
			doCreateProduct(data);
		} else {
			doUpdateProduct({ ...data, _id: id });
		}
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

						{type == "Add" && (
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
						)}

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
