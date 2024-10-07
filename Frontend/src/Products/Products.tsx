import { usePagination } from "@/api/data/usePagination";
import { useProducts } from "@/api/data/useProducts";
import { useQueryString } from "@/api/data/useQueryString";
import Filters from "@/components/Filters/Filters";
import Label from "@/components/ui/Label";
import { Searchbar } from "@/components/ui/Searchbar";
import { Flex } from "@/components/ui/flex";
import { FormControl } from "@/components/ui/form";
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

import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";

export default function Products() {
	const { user } = useLoginStore();
	const { data, meta } = useProducts();
	const [query, setQuery] = useQueryString();
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
				<Flex justify="between">
					<Flex gap="1" align="center">
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
					<div className="flex self-end">
						{user?.type === EAccountType.Seller && (
							<ProductForm type="Add" />
						)}
					</div>
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
