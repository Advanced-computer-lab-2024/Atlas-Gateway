import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";



import { toast } from "@/hooks/use-toast";
import { useLoginStore } from "@/store/loginStore";
import { EAccountType } from "@/types/enums";
import { TPlace } from "@/types/global";



import { apiCreatePlace, apiDeletePlace, apiGovernerPlaces, apiPlace, apiPlaces, apiUpdatePlace } from "../service/places";
import { onError } from "./onError";
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

export function useCreatePlace(onSuccess: (response: any) => void) {
	const { user } = useLoginStore();

	const mutation = useMutation({
		mutationFn: (place: TPlace) => {
			if (!user) {
				throw new Error("User is not defined");
			}
			return apiCreatePlace(place, user._id);
		},
		onError,
		onSuccess: (response) => {
			onSuccess(response);
			toast({
				title: "Place created successfully!",
			});
		},
	});

	const { mutate } = mutation;

	return { doCreatePlace: mutate, ...mutation };
}

export function useUpdatePlace(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: apiUpdatePlace,
		onError,
		onSuccess: () => {
			onSuccess();
			toast({
				title: "Place updated successfully!",
			});
		},
	});

	const { mutate } = mutation;

	return { doUpdatePlace: mutate, ...mutation };
}

export function useDeletePlace(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (_id: string) => apiDeletePlace(_id),
		onError,
		onSuccess: () => {
			onSuccess();
			toast({
				title: "Place deleted successfully!",
			});
		},
	});

	const { mutate } = mutation;

	return { doDeletePlace: mutate, ...mutation };
}