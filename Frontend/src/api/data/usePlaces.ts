import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { useLoginStore } from "@/store/loginStore";
import { EAccountType } from "@/types/enums";
import { TPlace } from "@/types/global";

import {
	apiCreatePlace,
	apiDeletePlace,
	apiGovernerPlaces,
	apiPlace,
	apiPlaces,
	apiUpdatePlace,
} from "../service/places";
import { useQueryString } from "./useQueryString";

export function usePlaces() {
	const { user } = useLoginStore();
	const { _id } = user || {};
	const [query] = useQueryString();

	const q = useQuery({
		queryFn: () =>
			user?.type === EAccountType.TourismGovernor
				? apiGovernerPlaces(_id, query)
				: apiPlaces(_id, query),
		queryKey: ["places", _id, query],
	});

	const { data } = q;

	return { ...q, data: data?.data?.data, meta: data?.data?.metaData };
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

export function useCreatePlace(onSuccess: () => void) {
	const { user } = useLoginStore();

	const mutation = useMutation({
		mutationFn: (place: TPlace) => {
			if (!user) {
				throw new Error("User is not defined");
			}
			return apiCreatePlace(place, user._id);
		},
		onSuccess,
	});

	const { mutate } = mutation;

	return { doCreatePlace: mutate, ...mutation };
}

export function useUpdatePlace(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: apiUpdatePlace,
		onSuccess,
	});

	const { mutate } = mutation;

	return { doUpdatePlace: mutate, ...mutation };
}

export function useDeletePlace(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (_id: string) => apiDeletePlace(_id),
		onSuccess,
	});

	const { mutate } = mutation;

	return { doDeletePlace: mutate, ...mutation };
}
