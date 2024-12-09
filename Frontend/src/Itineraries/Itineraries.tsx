import { Plus } from "lucide-react";
import { useState } from "react";

import { useItineraries } from "@/api/data/useItineraries";
import { usePagination } from "@/api/data/usePagination";
import { useTourGuideProfile } from "@/api/data/useProfile";
import { useQueryString } from "@/api/data/useQueryString";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useLoginStore } from "@/store/loginStore";
import { languageOptions } from "@/types/consts";
import { EAccountType } from "@/types/enums";
import { TItinerary } from "@/types/global";

import ItineraryForm from "./Form/ItineraryForm";
import ItineraryCard from "./ItineraryCard";

export default function Itineraries() {
	const { user } = useLoginStore();
	const { data, meta } = useItineraries();
	const [open, setOpen] = useState(false);
	const [itinerary, setItinerary] = useState<TItinerary>();
	const { data: tags } = useTags();
	const { data: guide } = useTourGuideProfile();

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

	const [query, setQuery] = useQueryString();

	return (
		<Flex isColumn gap="4" className="w-full h-full">
			<Label.Big600>
				View a list of itineraries you can follow!
			</Label.Big600>
			<Flex
				justify="between"
				gap="2"
				className="bg-surface-secondary p-2 rounded-lg border-2 border-solid border-black"
			>
				<Flex gap="1" align="center">
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
							<SelectItem value="price,1">
								Ascending price
							</SelectItem>
							<SelectItem value="price,-1">
								Descending price
							</SelectItem>
						</SelectContent>
					</Select>
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
										value: tag._id!,
									})) || [],
							},
							date: {
								// TODO: WIP
								filterName: "date",
								label: "Date",
								type: "date",
							},
							price: {
								filterName: "price",
								label: "Price",
								type: "range",
							},
							language: {
								filterName: "language",
								label: "Language",
								type: "checkbox",
								options: languageOptions,
							},
						}}
					/>
				</Flex>
				{user?.type === EAccountType.Guide &&
					guide?.isVerified &&
					guide?.acceptedTerms && (
						<Button
							onClick={() => setOpen(true)}
							variant="default"
							className="flex gap-2"
						>
							Add Itinerary <Plus />
						</Button>
					)}
			</Flex>
			<Flex
				className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
				gap="4"
			>
				{data
					?.filter((itinarary: TItinerary) => {
						if (
							user?.type === EAccountType.Tourist ||
							!user ||
							user?.type === EAccountType.Guest
						) {
							const currentDate = new Date();

							if (itinarary.startDateTime) {
								const activityDate = new Date(
									itinarary.startDateTime,
								);
								return activityDate > currentDate;
							}
						}
						return true;
					})
					.map((itinerary) => (
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
