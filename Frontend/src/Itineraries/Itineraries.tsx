import { useState } from "react";

import { useItineraries } from "@/api/data/useItineraries";
import { usePagination } from "@/api/data/usePagination";
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
import { TItinerary } from "@/types/global";

import ItineraryForm from "./Form/ItineraryForm";
import ItineraryCard from "./ItineraryCard";

export default function Itineraries() {
	const { user } = useLoginStore();
	const { data, meta } = useItineraries();
	const [open, setOpen] = useState(false);
	const [itinerary, setItinerary] = useState<TItinerary>();

	const openEditDrawer = (itinerary: TItinerary) => {
		setOpen(true);
		setItinerary(itinerary);
	};

	const closeEditDrawer = (open: boolean) => {
		setOpen(open);
		if (!open) setItinerary(undefined);
	};

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
				View a list of itineraries you can follow!
			</Label.Big600>
			<Flex
				justify="center"
				isColumn
				gap="2"
				className="bg-surface-secondary p-2 rounded-lg"
			>
				<Flex justify="between">
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
					{user?.type === EAccountType.Guide && (
						<Button onClick={() => setOpen(true)} variant="ghost">
							Add Itinerary
						</Button>
					)}
				</Flex>
			</Flex>
			<Flex
				className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
				gap="4"
			>
				{data?.map((itinerary) => (
					<ItineraryCard
						itinerary={itinerary}
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
			<ItineraryForm
				itinerary={itinerary}
				open={open}
				setOpen={closeEditDrawer}
			/>
		</Flex>
	);
}
