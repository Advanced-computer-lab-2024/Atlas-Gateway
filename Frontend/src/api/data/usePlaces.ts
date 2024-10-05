import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useQueryString from "use-query-string";

import { useLoginStore } from "@/store/loginStore";

import { apiPlace, apiPlaces } from "../service/places";

export function usePlaces() {
	const { user } = useLoginStore();
	const { id } = user || {};
	const navigate = useNavigate();
	// @ts-expect-error - idk
	const [query] = useQueryString(window.location, navigate);

	const { data } = useQuery({
		queryFn: () => apiPlaces(id, query),
		queryKey: ["places", id, query],
	});

	return { data: data?.data };
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
