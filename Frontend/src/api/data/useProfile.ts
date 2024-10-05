import { useQuery } from "@tanstack/react-query";

import { useLoginStore } from "@/store/loginStore";

import {
	apiAdvertisorProfile,
	apiSellerProfile,
	apiTourGuideProfile,
	apiTouristProfile,
} from "../service/profile";

export function useTouristProfile() {
	const { user } = useLoginStore();

	const id = user?.id;

	const { data } = useQuery({
		queryFn: () => {
			if (!id) {
				throw new Error("User ID is undefined");
			}
			return apiTouristProfile(id);
		},
		queryKey: ["profile", id],
	});

	return { data: data?.data };
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

export function useAdvertisorProfile() {
	const { user } = useLoginStore();

	const id = user?.id;

	const { data } = useQuery({
		queryFn: () => {
			if (!id) {
				throw new Error("User ID is undefined");
			}
			return apiAdvertisorProfile(id);
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
