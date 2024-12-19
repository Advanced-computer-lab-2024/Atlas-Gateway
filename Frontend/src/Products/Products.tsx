import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { usePagination } from "@/api/data/usePagination";
import { useProducts } from "@/api/data/useProducts";
import { useSellerProfile, useTouristProfile } from "@/api/data/useProfile";
import { useQueryString } from "@/api/data/useQueryString";
import Filters from "@/components/Filters/Filters";
import Label from "@/components/ui/Label";
import { Searchbar } from "@/components/ui/Searchbar";
import { Button } from "@/components/ui/button";
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
import { useLoginStore } from "@/store/loginStore";
import { EAccountType } from "@/types/enums";
import { TProduct } from "@/types/global";

import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";

export default function Products() {
	const { user } = useLoginStore();
	const navigate = useNavigate();
	const { data: seller } = useSellerProfile();
	const { data: tourist } = useTouristProfile();
	const { data, meta } = useProducts();
	const [query, setQuery] = useQueryString();
	const { page, onPageChange, pagesCount } = usePagination({
		pageNum: meta?.pages || 1,
		pagesCount: meta?.pages || 1,
	});

	const [isProductFormOpen, setIsProductFormOpen] = useState(false);
	const [product, setProduct] = useState<TProduct | undefined>(undefined);

	const [wishlist, setWishlist] = useState(false);

	const openEditDrawer = (product: TProduct) => {
		setIsProductFormOpen(true);
		setProduct(product);
	};

	return (
		<Flex isColumn gap="4" className="w-full h-full">
			<Flex justify="between" gap="2" align="center">
				<Label.Big600>Products ({meta?.total || 0})</Label.Big600>
				{user?.type === EAccountType.Tourist && (
					<Flex
						className="relative w-14 h-14 cursor-pointer"
						align="center"
						justify="center"
						onClick={() => navigate("cart")}
					>
						<ShoppingCart width={48} height={48} />
						{tourist?.cart && tourist.cart.length > 0 && (
							<Flex
								align="center"
								justify="center"
								className="absolute top-0 right-0 w-5 h-5 rounded-full bg-surface-primary"
							>
								<Label.Thin300>
									{tourist.cart.length}
								</Label.Thin300>
							</Flex>
						)}
					</Flex>
				)}
			</Flex>
			<Flex
				justify="between"
				gap="2"
				className="bg-surface-secondary p-2 rounded-lg border-2 border-solid border-black"
			>
				<Flex gap="5" align="center">
					<Flex gap="2" align="center">
						<Label.Mid400>Sort:</Label.Mid400>
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
							<SelectTrigger className="bg-white">
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
					<Flex gap="2" align="center">
						<Searchbar />
						<Filters
							filters={{
								price: {
									filterName: "price",
									label: "Price",
									type: "range",
								},
							}}
						/>
					</Flex>
					<Flex>
						{user?.type === EAccountType.Tourist && (
							<Button
								onClick={() => {
									setWishlist(!wishlist);
								}}
							>
								{wishlist ? "View All" : "My Wishlist"}
							</Button>
						)}
					</Flex>
				</Flex>

				{user?.type === EAccountType.Seller &&
					seller?.isVerified &&
					seller?.acceptedTerms && (
						<Button onClick={() => setIsProductFormOpen(true)}>
							Add Product
						</Button>
					)}
			</Flex>
			<Flex
				className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
				gap="4"
			>
				{!wishlist
					? data?.map((product) => (
							<ProductCard
								product={product}
								openEditDrawer={openEditDrawer}
							/>
						))
					: data
							?.filter((product) => {
								return product.touristWishlist.includes(
									user?._id ?? "",
								);
							})
							.map((product) => (
								<ProductCard
									product={product}
									openEditDrawer={openEditDrawer}
								/>
							))}
			</Flex>
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
								<PaginationLink isActive={page === num + 1}>
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
			<ProductForm
				open={isProductFormOpen}
				setOpen={setIsProductFormOpen}
				product={product}
			/>
		</Flex>
	);
}
