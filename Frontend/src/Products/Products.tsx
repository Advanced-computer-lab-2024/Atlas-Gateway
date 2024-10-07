import { usePagination } from "@/api/data/usePagination";
import { useProducts } from "@/api/data/useProducts";
import Filters from "@/components/Filters/Filters";
import Label from "@/components/ui/Label";
import { Searchbar } from "@/components/ui/Searchbar";
import { Flex } from "@/components/ui/flex";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { useLoginStore } from "@/store/loginStore";
import { EAccountType } from "@/types/enums";

import ProductCard from "./ProductCard";
import ProdcutForm from "./ProductForm";
import ProductForm from "./ProductForm";

export default function Products() {
	const { user } = useLoginStore();
	const { data, meta } = useProducts();
	console.log(data);
	const { page, onPageChange, pagesCount } = usePagination({
		pageNum: meta?.pages || 1,
		pagesCount: meta?.pages || 1,
	});

	return (
		<Flex
			isColumn
			gap="4"
			className="w-full h-full px-10 py-8 overflow-y-scroll"
		>
			<Label.Big600>View a list of products you can buy!</Label.Big600>
			<Flex
				justify="center"
				isColumn
				gap="2"
				className="bg-surface-secondary p-2 rounded-lg"
			>
				<Flex>
					<Flex gap="1" align="center">
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
						<div className="flex self-end">
							{user?.type === EAccountType.Seller && (
								<ProductForm type="Add" />
							)}
						</div>
					</Flex>
				</Flex>
			</Flex>
			<Flex
				className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
				gap="4"
			>
				{data?.map((product) => <ProductCard {...product} />)}
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
		</Flex>
	);
}
