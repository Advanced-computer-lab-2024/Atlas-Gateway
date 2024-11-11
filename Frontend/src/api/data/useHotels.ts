import { useMutation, useQuery } from "@tanstack/react-query";

import { useLoginStore } from "@/store/loginStore";
import { THotel } from "@/types/global";

import { IHotelBooking } from "../../../../Backend/src/Models/Hotel/hotel.model";
import { apiBookHotels, apiListHotels, apiShowHotel } from "../service/hotels";
import { useQueryString } from "./useQueryString";

export function useHotels(cityCode: string) {
	const [query] = useQueryString();

	const { data, refetch } = useQuery({
		queryFn: () => apiListHotels(cityCode),
		queryKey: ["hotels", cityCode, query],
		enabled: !!cityCode,
	});
	return { data: data?.data as THotel[], refetch };
}

export function useHotelDetails(iataCode: string | null) {
	const { data, refetch } = useQuery({
		queryFn: () => apiShowHotel(iataCode),
		queryKey: ["hotel", iataCode],
		enabled: !!iataCode,
	});
	return { data: data?.data as THotel, refetch };
}

export function useBookhotel(onSuccess: () => void) {
	const { user } = useLoginStore();
	const mutation = useMutation({
		mutationFn: (hotel: IHotelBooking) => {
			if (!user?._id) {
				throw new Error("User ID is undefined");
			}
			return apiBookHotels(hotel, user._id);
		},
		onSuccess,
	});

	const { mutate, isPending } = mutation;

	return { doBookHotel: mutate, ...mutation, isPending };
}
