
import { usePagination } from "@/api/data/usePagination";
import { usePlaces } from "@/api/data/usePlaces";
import Filters from "@/components/Filters/Filters";
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

import PlaceCard from "./PlaceCard";
import { Searchbar } from "@/components/ui/Searchbar";

export default function Places() {
	const { data, meta } = usePlaces();

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
			<Label.Big600>
				View a list of museums and historical locations you can visit!
			</Label.Big600>
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
								tags: {
									filterName: "tags",
									label: "Tags",
									type: "checkbox",
									options: [],
								},
								categories: {
									filterName: "categories",
									label: "Categories",
									type: "checkbox",
									options: [],
								},
								rating: {
									filterName: "avgRating",
									label: "Rating",
									type: "range",
								},
							}}
						/>
					</Flex>
				</Flex>
			</Flex>
			<Flex
				className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
				gap="4"
			>
				{data?.map((place) => <PlaceCard {...place} />)}
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
