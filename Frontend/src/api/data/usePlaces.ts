import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";



import { useLoginStore } from "@/store/loginStore";



import { apiPlace, apiPlaces } from "../service/places";
import { useQueryString } from "./useQueryString";


export function usePlaces() {
	const { user } = useLoginStore();
	const { _id } = user || {};
	const [query] = useQueryString();

	const { data } = useQuery({
		queryFn: () => apiPlaces(_id, query),
		queryKey: ["places", _id, query],
	});

	return { data: data?.data?.data, meta: data?.data?.metaData };
}

export function usePlace() {
	const { id } = useParams<{
		id: string;
	}>();

	const { data } = useQuery({
		queryFn: () => apiPlace(id),
		queryKey: ["place", id],
	});

	return { data: data?.data };
}