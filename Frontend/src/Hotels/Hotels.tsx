import { useState } from "react";

import { useHotels } from "@/api/data/useHotels";
import { Flex } from "@/components/ui/flex";
import { FormControl } from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { citycodes } from "@/types/consts";
import { THotels } from "@/types/global";

import { IHotelBooking } from "../../../Backend/src/Models/Hotel/hotel.model";
import HotelsCard from "./HotelsCard";

const Hotels = () => {
	const [cityCode, setCityCode] = useState("");
	const { data } = useHotels(cityCode, () => {});
	return (
		<Flex isColumn gap="4" className="w-full h-full p-4 overflow-y-scroll">
			<div>
				<Select onValueChange={setCityCode} value={cityCode}>
					<SelectTrigger className="flex gap-4">
						<SelectValue placeholder="Select City Code" />
					</SelectTrigger>
					<SelectContent>
						{citycodes.map((code) => (
							<SelectItem key={code.value} value={code.value}>
								{code.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<Flex
				className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
				gap="4"
			>
				{data?.map((hotel: THotels, index: number) => (
					<HotelsCard key={index} {...hotel} />
				))}
			</Flex>
		</Flex>
	);
};

export default Hotels;
