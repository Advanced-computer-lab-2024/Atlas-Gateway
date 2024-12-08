import { Plus } from "lucide-react";
import { useState } from "react";

import { usePagination } from "@/api/data/usePagination";
import { useTransportations } from "@/api/data/useTransportations";
import Label from "@/components/ui/Label";
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
import { TTransportation } from "@/types/global";

import TransportationForm from "./Form/TransportationForm";
import TransportationCard from "./TransportationCard";

export default function Transportations() {
	const { user } = useLoginStore();
	const { data, meta } = useTransportations();
	const [open, setOpen] = useState(false);
	const [selectedTransportation, setTransportation] =
		useState<TTransportation>();

	const openEditDrawer = (transportation: TTransportation) => {
		setOpen(true);
		setTransportation(transportation);
	};

	const closeEditDrawer = (open: boolean) => {
		setOpen(open);
		if (!open) setTransportation(undefined);
	};

	const { page, onPageChange, pagesCount } = usePagination({
		pageNum: meta?.pages || 1,
		pagesCount: meta?.pages || 1,
	});

	return (
		<Flex isColumn gap="4" className="w-full h-full">
			<Label.Big600>
				View a list of transportations you can take!
			</Label.Big600>
			<Flex
				justify="between"
				gap="2"
				className="bg-surface-secondary p-2 rounded-lg border-2 border-solid border-black"
			>
				{user?.type === EAccountType.TransportationAdvertiser && (
					<Button
						onClick={() => setOpen(true)}
						variant="default"
						className="flex gap-2"
					>
						Add Transportation <Plus />
					</Button>
				)}
			</Flex>
			<Flex
				className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
				gap="4"
			>
				{data?.map((transportation) => (
					<TransportationCard
						transportation={transportation}
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
			<TransportationForm
				transportation={selectedTransportation}
				open={open}
				setOpen={closeEditDrawer}
			/>
		</Flex>
	);
}
