import { useMutation, useQuery } from "@tanstack/react-query";
import { type } from "os";

import { useLoginStore } from "@/store/loginStore";
import { THotels } from "@/types/global";

import { IHotelBooking } from "../../../../Backend/src/Models/Hotel/hotel.model";
import { apiBookHotels, apiListHotels } from "../service/hotels";
import { apiProducts } from "../service/product";
import { useQueryString } from "./useQueryString";

export function useHotels(
	cityCode: string,
	onSuccess: (response: any) => void,
) {
	const [query] = useQueryString();

	const { data, refetch } = useQuery({
		queryFn: () => apiListHotels(cityCode),
		queryKey: ["hotels", cityCode, query],
		enabled: !!cityCode,
	});
	console.log(data);
	return { data: data?.data as THotels[], refetch };
}

// export function useSearchHotels(onSuccess: (response: any) => void) {
// 	const mutation = useMutation({
// 		mutationFn: apiSearchHotels,
// 		onSuccess,
// 	});

// 	const { mutate, isPending } = mutation;

// 	return { doSearchHotels: mutate, ...mutation, isPending };
// }

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
