import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";



import { useLoginStore } from "@/store/loginStore";
import { TItinerary } from "@/types/global";



import { apiCreateItinerary, apiDeleteItinerary, apiItineraries, apiItinerary, apiUpdateItinerary } from "../service/itineraries";
import { useQueryString } from "./useQueryString";


export function useItineraries() {
	const { user } = useLoginStore();
	const { _id } = user || {};
	const [query] = useQueryString();

	const q = useQuery({
		queryFn: () => apiItineraries(_id, query),
		queryKey: ["itinerary", _id, query],
	});

	const { data } = q;

	return { ...q, data: data?.data?.data, meta: data?.data?.metaData };
}

export function useItinerary() {
	const { id } = useParams<{
		id: string;
	}>();

	const { data } = useQuery({
		queryFn: () => apiItinerary(id),
		queryKey: ["itinerary", id],
	});

	return { data: data?.data };
}

export function useCreateItinerary(onSuccess: () => void) {
	const { user } = useLoginStore();
	const mutation = useMutation({
		mutationFn: (data: TItinerary) => {
			const { _id } = user || {};

			if (!_id) {
				throw new Error("User ID is undefined");
			}

			return apiCreateItinerary(data, _id);
		},
		onSuccess,
	});

	const { mutate } = mutation;

	return { doCreateItinerary: mutate, ...mutation };
}

export function useUpdateItinerary(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: apiUpdateItinerary,
		onSuccess,
	});

	const { mutate } = mutation;

	return { doUpdateItinerary: mutate, ...mutation };
}

export function useDeleteItinerary(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (_id: string) => apiDeleteItinerary(_id),
		onSuccess,
	});

	const { mutate } = mutation;

	return { doDeleteItinerary: mutate, ...mutation };
}