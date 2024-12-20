import axios from "axios";
import { Archive, ArchiveRestore, Package, RotateCw } from "lucide-react";
import { useEffect, useState } from "react";

import { usePagination } from "@/api/data/usePagination";
import { useProducts, useUpdateProduct } from "@/api/data/useProducts";
import { useQueryString } from "@/api/data/useQueryString";
import Label from "@/components/ui/Label";
import { Flex } from "@/components/ui/flex";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import useCurrency from "@/hooks/useCurrency";

import ProductForm from "./ProductForm";

const Product = () => {
	const { data: products, meta, refetch } = useProducts();
	console.log(products);
	const { doUpdateProduct } = useUpdateProduct(() => {
		refetch();
	});
	const { page, onPageChange, pagesCount } = usePagination({
		pageNum: meta?.pages || 1,
		pagesCount: meta?.pages || 1,
	});
	const [productsPics, setProductsPics] = useState<{ [key: string]: string }>(
		{},
	);

	const convertCurrency = useCurrency();
	const handleArchive = (isArchived: boolean, id: string) => {
		doUpdateProduct({ isArchived: !isArchived, _id: id });
	};

	const handleDownload = async (productId: string, filePath: string) => {
		try {
			const res = await axios.post(
				`http://localhost:5000/api/media/download`,
				{ filePath },
			);
			setProductsPics((prevPics) => ({
				...prevPics,
				[productId]: res.data,
			}));
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		products?.forEach((prod) => {
			handleDownload(prod._id, prod.imagePath);
		});
	}, [products]);
	const [query, setQuery] = useQueryString();
	return (
		<div className="flex flex-col p-3 overflow-y-auto pb-32">
			<div className="flex gap-3 self-end pb-3 items-center">
				<div className="cursor-pointer hover:text-[#2b58ed]">
					<RotateCw onClick={() => refetch()} />
				</div>
				<Flex gap="2" align="center">
					<Label.Mid300>Sort:</Label.Mid300>
					<Select
						onValueChange={(value) => {
							if (value === "0") {
								setQuery({
									...query,
									sort: undefined,
								});
							} else {
								setQuery({
									...query,
									sort: value,
								});
							}
						}}
					>
						<SelectTrigger>
							<SelectValue placeholder="Sort" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="0">None</SelectItem>
							<SelectItem value="avgRating,1">
								Ascending rating
							</SelectItem>
							<SelectItem value="avgRating,-1">
								Descending rating
							</SelectItem>
						</SelectContent>
					</Select>
				</Flex>
				<ProductForm type="Add" />
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{products?.map((prod) => (
					<div
						key={prod._id}
						className="relative flex flex-col p-4 bg-white shadow-lg rounded-lg"
					>
						<div className="w-full h-40 flex justify-center items-center bg-gray-100 rounded-md">
							{!productsPics[prod._id] ? (
								<Package className="w-20 h-20" />
							) : (
								<img
									src={productsPics[prod._id]}
									alt="Product Picture"
									className="object-contain w-full h-full"
								/>
							)}
						</div>
						<div className="flex justify-between m-2">
							<h2 className="text-lg font-semibold mt-2">
								{prod.name}
							</h2>
							<ProductForm id={prod._id} type="Update" />
						</div>

						<h3 className="">{prod.description}</h3>
						<div className="flex justify-between mt-3">
							<div className="flex flex-col">
								<h3 className="text-sm">
									Price: ${convertCurrency(prod?.price)}
								</h3>
								<h3 className="flex gap-2 text-sm">
									Archived: {prod?.isArchived ? "Yes" : "No"}
									<button
										onClick={() =>
											handleArchive(
												prod?.isArchived,
												prod._id,
											)
										}
									>
										{prod?.isArchived ? (
											<Archive />
										) : (
											<ArchiveRestore />
										)}
									</button>
								</h3>
							</div>
							<div className="flex flex-col">
								<h3 className="text-sm">
									Quantity: {prod?.quantity}
								</h3>
								<h3 className="text-sm">
									Sales: {prod?.sales ?? 0}
								</h3>
							</div>
						</div>
						<h3 className="text-sm text-[#2b58ed]">
							Rating: {prod?.avgRating} / 5
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
