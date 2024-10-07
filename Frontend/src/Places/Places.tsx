import { useState } from "react";

import { useCategories } from "@/api/data/useCategories";
import { usePagination } from "@/api/data/usePagination";
import { usePlaces } from "@/api/data/usePlaces";
import { useTags } from "@/api/data/useTags";
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
import { useLoginStore } from "@/store/loginStore";
import { EAccountType } from "@/types/enums";
import { TPlace } from "@/types/global";

import PlaceForm from "./Form/PlacesForm";
import PlaceCard from "./PlaceCard";

export default function Places() {
	const { user } = useLoginStore();
	const { data, meta } = usePlaces();
	const [open, setOpen] = useState(false);
	const [place, setPlace] = useState<TPlace>();

	const { page, onPageChange, pagesCount } = usePagination({
		pageNum: meta?.pages || 1,
		pagesCount: meta?.pages || 1,
	});

	const openEditDrawer = (place: TPlace) => {
		setOpen(true);
		setPlace(place);
	};

	const { data: categories } = useCategories();
	const { data: tags } = useTags();

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
				<Flex align="center" justify="between">
					<Flex gap="1" align="center">
						<Searchbar />
						<Filters
							filters={{
								tags: {
									filterName: "tags",
									label: "Tags",
									type: "checkbox",
									options:
										tags?.map((tag) => ({
											label: tag.name,
											value: tag._id,
										})) || [],
								},
								categories: {
									filterName: "categories",
									label: "Categories",
									type: "checkbox",
									options:
										categories?.map((category) => ({
											label: category.name,
											value: category._id,
										})) || [],
								},
								avgRating: {
									filterName: "avgRating",
									label: "Rating",
									type: "range",
								},
							}}
						/>
					</Flex>
					{user?.type === EAccountType.TourismGovernor && (
						<Button
							variant="ghost"
							onClick={() => {
								setOpen(true);
							}}
						>
							Add Place
						</Button>
					)}
				</Flex>
			</Flex>
			<Flex
				className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
				gap="4"
			>
				{data?.map((place) => (
					<PlaceCard place={place} openEditDrawer={openEditDrawer} />
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
			<PlaceForm open={open} setOpen={setOpen} place={place} />
		</Flex>
	);
}
