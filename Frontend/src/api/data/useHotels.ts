import { useMutation } from "@tanstack/react-query";



import { useLoginStore } from "@/store/loginStore";



import { IHotelBooking } from "../../../../Backend/src/Models/Hotel/hotel.model";
import { apiBookHotels, apiSearchHotels } from "../service/hotels";


export function useSearchHotels(onSuccess: (response: any) => void) {
	const mutation = useMutation({
		mutationFn: apiSearchHotels,
		onSuccess,
	});

	const { mutate, isPending } = mutation;
	
    return { doSearchHotels: mutate, ...mutation, isPending };

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