import { useState } from "react";

import { useHotels } from "@/api/data/useHotels";
import { Flex } from "@/components/ui/flex";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { citycodes } from "@/types/consts";
import { THotel } from "@/types/global";

import HotelDetailsSheet from "./HotelDetailsSheet";
import HotelsCard from "./HotelsCard";

const Hotels = () => {
	const [cityCode, setCityCode] = useState("");
	const { data } = useHotels(cityCode);

	const [hotel, setHotel] = useState<string | null>("");
	const [open, setOpen] = useState(false);

	const openEditDrawer = (hotel: string) => {
		setHotel(hotel);
		setOpen(true);
	};

	return (
		<Flex isColumn gap="4" className="w-full h-full p-4 overflow-y-scroll">
			<Select onValueChange={setCityCode} value={cityCode}>
				<SelectTrigger className="flex gap-4 w-52">
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
			<Flex
				className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
				gap="4"
			>
				{data?.map((hotel: THotel, index: number) => (
					<HotelsCard
						key={index}
						hotel={hotel}
						openEditDrawer={openEditDrawer}
					/>
				))}
			</Flex>
			<HotelDetailsSheet open={open} setOpen={setOpen} id={hotel} />
		</Flex>
	);
};

export default Hotels;
