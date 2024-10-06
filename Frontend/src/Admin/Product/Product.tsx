import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Package, Pencil, RotateCw } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { usePagination } from "@/api/data/usePagination";
import { useProduct, useProducts } from "@/api/data/useProducts";
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
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { TProduct } from "@/types/global";

import { productSchema } from "../schema";
import EditProduct from "./EditProduct";

const Product = () => {
	const [products, setProducts] = useState<TProduct[]>([]);
	const [refresh, setRefresh] = useState<boolean>(false);
	const { data: products, meta } = useProducts();
	const { page, onPageChange, pagesCount } = usePagination({
		pageNum: meta?.pages || 1,
		pagesCount: meta?.pages || 1,
	});

	const formMethods = useForm<z.infer<typeof productSchema>>({
		resolver: zodResolver(productSchema),
	});

	const { handleSubmit, control } = formMethods;

	const onSubmit = (data: z.infer<typeof productSchema>) => {
		console.log(data);
		axios
			.post("http://localhost:5000/api/products/create", data, {
				headers: {
					userId: "123456", // will be edited once we are able to login // 6/10 - changed to a valid admin ID
				},
			})
			.then((res) => {
				console.log(res.status);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/products/list")
			.then((res) => {})
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
						<Button
							variant="outline"
							className="hover:bg-[#65ba2d]"
						>
							Add a product
						</Button>
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
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{products?.map((prod) => (
					<div
						key={prod._id}
						className="relative flex flex-col p-4 bg-white shadow-lg rounded-lg"
					>
						<div className="w-full h-40 flex justify-center items-center bg-gray-100 rounded-md">
							<Package className="w-16 h-16 text-gray-400" />
						</div>
						<div className="flex justify-between m-2">
							<h2 className="text-lg font-semibold mt-2">
								{prod.name}
							</h2>
							<EditProduct id={prod._id} />
						</div>

						<h3 className="">{prod.description}</h3>
						<div className="flex justify-between mt-3">
							<div className="flex flex-col">
								<h3 className="text-sm">
									Price: ${prod.price}
								</h3>
								<h3 className="text-sm">
									Archived: {prod?.isArchived ? "Yes" : "No"}
								</h3>
							</div>
							<div className="flex flex-col">
								<h3 className="text-sm">
									Quantity: {prod?.quantity}
								</h3>
								<h3 className="text-sm">
									Sales: {prod?.sales}
								</h3>
							</div>
						</div>
						<h3 className="text-sm text-[#2b58ed]">
							Rating: {prod.avgRating} / 5
						</h3>
						<h3 className="pb-6">{prod.reviews}</h3>
					</div>
				))}
				<div className="flex justify-center">
					{pagesCount > 1 && (
						<Pagination>
							{page !== 1 && (
								<PaginationPrevious
									onClick={() => onPageChange(page - 1)}
								/>
							)}
							<PaginationContent>
								{[...Array(pagesCount).keys()].map((num) => (
									<PaginationItem
										key={num}
										onClick={() => onPageChange(num + 1)}
									>
										<PaginationLink
											isActive={page === num + 1}
										>
											{num + 1}
										</PaginationLink>
									</PaginationItem>
								))}
							</PaginationContent>
							{page !== pagesCount && (
								<PaginationNext
									onClick={() => onPageChange(page + 1)}
								/>
							)}
						</Pagination>
					)}
				</div>
			</div>
		</div>
	);
};

export default Product;
