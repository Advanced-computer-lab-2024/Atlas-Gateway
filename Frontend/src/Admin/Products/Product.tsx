import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Package, Pencil, RotateCw } from "lucide-react";
import { useEffect, useState } from "react";
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

import { productSchema } from "./schema";

interface Product {
	_id: string;
	name: string;
	description: string;
	price: number;
	picture: string;
	quantity: number;
	isArchived: boolean;
	sales: number;
	rating: number;
	review: string;
}

const Product = () => {
	const formMethods = useForm<z.infer<typeof productSchema>>({
		resolver: zodResolver(productSchema),
	});

	const { handleSubmit, control } = formMethods;

	const [products, setProducts] = useState<Product[]>([]);
	const [refresh, setRefresh] = useState<boolean>(false);

	const onSubmit = (data: z.infer<typeof productSchema>) => {
		console.log(data);
	};

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/products/list")
			.then((res) => {
				setProducts(res.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [refresh]);

	return (
		<div className="flex flex-col p-3 h-screen overflow-y-auto pb-32">
			<div className="flex gap-3 self-end pb-3 items-center">
				<div className="cursor-pointer hover:text-[#2b58ed]">
					<RotateCw onClick={() => setRefresh(!refresh)} />
				</div>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="outline">Add a product</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Add a product</SheetTitle>
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

								<SheetFooter>
									<Button type="submit">Save changes</Button>
								</SheetFooter>
							</form>
						</FormProvider>
					</SheetContent>
				</Sheet>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{products.map((prod) => (
					<div
						key={prod._id}
						className="relative flex flex-col p-4 bg-white shadow-lg rounded-lg"
					>
						<div className="w-full h-40 flex justify-center items-center bg-gray-100 rounded-md">
							<Package className="w-16 h-16 text-gray-400" />
						</div>
						<h2 className="text-lg font-semibold mt-2">
							{prod.name}
						</h2>
						<h3 className="">{prod.description}</h3>
						<div className="flex justify-between mt-3">
							<div className="flex flex-col">
								<h3 className="text-sm">
									Price: ${prod.price}
								</h3>
								<h3 className="text-sm">
									Archived: {prod.isArchived ? "Yes" : "No"}
								</h3>
							</div>
							<div className="flex flex-col">
								<h3 className="text-sm">
									Quantity: {prod.quantity}
								</h3>
								<h3 className="text-sm">Sales: {prod.sales}</h3>
							</div>
						</div>
						<h3 className="text-sm text-[#2b58ed]">
							Rating: {prod.rating} / 5
						</h3>
						<h3 className="pb-6">{prod.review}</h3>
						<div className="flex justify-center">
							<button className="bg-blue-500 text-white rounded-full p-2 shadow-lg hover:bg-blue-600">
								<Pencil className="w-5 h-5" />
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Product;
