import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { useLoginStore } from "@/store/loginStore";

import { apiItineraries, apiItinerary } from "../service/itineraries";
import { useQueryString } from "./useQueryString";

export function useItineraries() {
	const { user } = useLoginStore();
	const { _id } = user || {};
	const [query] = useQueryString();

	const { data } = useQuery({
		queryFn: () => apiItineraries(_id, query),
		queryKey: ["itinerary", _id, query],
	});

	return { data: data?.data?.data, meta: data?.data?.metaData };
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
