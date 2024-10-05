import {
	UseMutationOptions,
	useMutation,
	useQuery,
} from "@tanstack/react-query";

import { useLoginStore } from "@/store/loginStore";
import { TTourist } from "@/types/global";

import {
	apiAdvertiserProfile,
	apiEditTouristProfile,
	apiSellerProfile,
	apiTourGuideProfile,
	apiTouristProfile,
} from "../service/profile";

export function useTouristProfile() {
	const { user } = useLoginStore();

	const id = user?.id;

	const { data, refetch } = useQuery({
		queryFn: () => {
			if (!id) {
				throw new Error("User ID is undefined");
			}
			return apiTouristProfile(id);
		},
		queryKey: ["profile", id],
	});

	return { data: data?.data, refetch };
}

export function useUpdateTouristProfile(onSuccess: () => void) {
	const { user } = useLoginStore();

	const mutation = useMutation({
		mutationFn: (data: TTourist) => apiEditTouristProfile(user?.id, data),
		onSuccess,
	});

	const { mutate } = mutation;

	return { doEditTouristProfile: mutate, ...mutation };
}

export function useSellerProfile() {
	const { user } = useLoginStore();

	const id = user?.id;

	const { data } = useQuery({
		queryFn: () => {
			if (!id) {
				throw new Error("User ID is undefined");
			}
			return apiSellerProfile(id);
		},
		queryKey: ["profile", id],
	});

	return { data: data?.data };
}

export function useAdvertiserProfile() {
	const { user } = useLoginStore();

	const id = user?.id;

	const { data } = useQuery({
		queryFn: () => {
			if (!id) {
				throw new Error("User ID is undefined");
			}
			return apiAdvertiserProfile(id);
		},
		queryKey: ["profile", id],
	});

	return { data: data?.data };
}

export function useTourGuideProfile() {
	const { user } = useLoginStore();

	const id = user?.id;

	const { data } = useQuery({
		queryFn: () => {
			if (!id) {
				throw new Error("User ID is undefined");
			}
			return apiTourGuideProfile(id);
		},
		queryKey: ["profile", id],
	});

	return { data: data?.data };
}
