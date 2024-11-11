import { useState } from "react";



import { Flex } from "@/components/ui/flex";



import { IHotelBooking } from "../../../Backend/src/Models/Hotel/hotel.model";
import SearchForm from "./Form/SearchForm";
import HotelsCard from "./HotelsCard";


const Hotels = () => {
	const [hotels, setHotels] = useState<IHotelBooking[]>([]);

	const addHotel = (newHotel: IHotelBooking) => {
		setHotels((prevHotels) => [...prevHotels, newHotel]);
	};
	const removeHotels = () => {
		setHotels([]);
	};
	return (
		<Flex isColumn gap="4" className="w-full h-full p-4 overflow-y-scroll">
			<div className="self-center">
				<SearchForm
					addHotels={addHotel}
					removeHotels={removeHotels}
				/>
			</div>
			<Flex
				className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
				gap="4"
			>
				{hotels.map((hotel, index) => (
					<HotelsCard key={index} {...hotel} />
				))}
			</Flex>
		</Flex>
	);
};

export default Hotels;