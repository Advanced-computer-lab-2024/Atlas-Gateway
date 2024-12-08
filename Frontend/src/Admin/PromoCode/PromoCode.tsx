import { RotateCw, Trash } from "lucide-react";

import { useCreatePromoCode, usePromoCodes } from "@/api/data/usePromo";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { TPromo } from "@/types/global";

import PromoSheet from "./PromoSheet";

const PromoCode = () => {
	const { data, refetch } = usePromoCodes();
	return (
		<div className="flex flex-col p-3 overflow-hidden">
			<div className="flex self-end pb-3">
				<PromoSheet />
			</div>
			<Table>
				<TableCaption>Promo Codes</TableCaption>
				<TableHeader className="bg-gray-100">
					<TableRow>
						<TableHead>Promo Code</TableHead>
						<TableHead>Discount Percentage</TableHead>
						<TableHead>Expiry Date</TableHead>
						<TableHead>All Users</TableHead>
						<TableHead className="cursor-pointer hover:text-[#2b58ed] w-1">
							<RotateCw onClick={() => refetch()} />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.map((promo: TPromo) => (
						<TableRow key={promo._id}>
							<TableCell>{promo.promoCode}</TableCell>
							<TableCell>{promo.discountPercentage}</TableCell>
							<TableCell>{promo.expiryDate}</TableCell>
							<TableCell>
								{promo.allUsers ? "Yes" : "No"}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default PromoCode;
