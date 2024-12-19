import { useMutation, useQuery } from "@tanstack/react-query";

import { useAmadeusToken } from "@/Hotels/AmadeusContext";
import { useLoginStore } from "@/store/loginStore";
import { IHotelBooking, THotel } from "@/types/global";

import {
	apiBookHotels,
	apiListHotels,
	apiShowHotelOffers,
	apiShowHotelRatings,
} from "../service/hotels";
import { useQueryString } from "./useQueryString";
import { toast } from "@/hooks/use-toast";
import { onError } from "./onError";

export function useHotels(cityCode: string) {
	const [query] = useQueryString();

	const { data, refetch } = useQuery({
		queryFn: () => apiListHotels(cityCode, query),
		queryKey: ["hotels", cityCode, query],
		enabled: !!cityCode,
	});
	return { data: data?.data as THotel[], refetch };
}

export function useHotelRatings(id: string | null) {
	const token = useAmadeusToken();
	const { data, refetch } = useQuery({
		queryFn: () => apiShowHotelRatings(id, token),
		queryKey: ["hotel-rating", id],
		enabled: !!id && !!token,
	});
	return { data: data?.data, refetch };
}

export function useHotelOffers(id: string | null) {
	const [query] = useQueryString();
	const token = useAmadeusToken();
	const { data, refetch } = useQuery({
		queryFn: () => apiShowHotelOffers(id, token, query),
		queryKey: ["hotel", id],
		enabled: !!id && !!token,
	});
	return { data: data?.data.data, refetch };
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
		onError,
		onSuccess: () => {
			onSuccess();
			toast({
				title: "Hotel booked successfully!",
			});
		},
	});

	const { mutate, isPending } = mutation;

	return { doBookHotel: mutate, ...mutation, isPending };
}
