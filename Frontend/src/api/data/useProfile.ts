import { useMutation, useQuery } from "@tanstack/react-query";

import { useLoginStore } from "@/store/loginStore";
import {
	TAdvetisor,
	TPassword,
	TSeller,
	TTourGuide,
	TTourist,
} from "@/types/global";

import {
	apiAdvertiserProfile,
	apiAdvertisers,
	apiChangePassword,
	apiDeleteAdvertiserProfile,
	apiDeleteSeller,
	apiDeleteTourGuideProfile,
	apiDeleteTouristProfile,
	apiEditAdvertiserProfile,
	apiEditSellerProfile,
	apiEditTourGuideProfile,
	apiEditTouristProfile,
	apiSellerProfile,
	apiSellers,
	apiTourGuideProfile,
	apiTourGuides,
	apiTouristProfile,
	apiTourists,
} from "../service/profile";

export function useTourists() {
	const { data, refetch } = useQuery({
		queryFn: () => apiTourists(),
		queryKey: ["tourists"],
	});
	return { data: data?.data, refetch };
}

export function useTouristProfile() {
	const { user } = useLoginStore();

	const id = user?._id;

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

export function useUpdatePassword(onSuccess: () => void) {
	const { user } = useLoginStore();

	const mutation = useMutation({
		mutationFn: (data: TPassword) => {
			return apiChangePassword(user?.username ?? "", data);
		},
		onSuccess,
	});
	const { mutate } = mutation;
	return { doEditPassword: mutate, ...mutation };
}

export function useUpdateTouristProfile(onSuccess: () => void) {
	const { user } = useLoginStore();

	const mutation = useMutation({
		mutationFn: (data: TTourist) => {
			if (!user?._id) {
				throw new Error("User ID is undefined");
			}
			return apiEditTouristProfile(user._id, data);
		},
		onSuccess,
	});

	const { mutate } = mutation;

	return { doEditTouristProfile: mutate, ...mutation };
}

export function useDeleteTouristProfile(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (_id: string) => apiDeleteTouristProfile(_id),
		onSuccess,
	});
	const { mutate } = mutation;
	return { doDeleteTouristProfile: mutate, ...mutation };
}

export function useSellers() {
	const { user } = useLoginStore();
	const { data, refetch } = useQuery({
		queryFn: () => apiSellers(),
		queryKey: ["sellers", user?._id],
	});
	return { data: data?.data, refetch };
}

export function useSellerProfile() {
	const { user } = useLoginStore();

	const id = user?._id;

	const { data, refetch } = useQuery({
		queryFn: () => {
			if (!id) {
				throw new Error("User ID is undefined");
			}
			return apiSellerProfile(id);
		},
		queryKey: ["profile", id],
	});

	return { data: data?.data, refetch };
}

export function useUpdateSellerProfile(onSuccess: () => void) {
	const { user } = useLoginStore();

	const mutation = useMutation({
		mutationFn: (data: TSeller) => {
			if (!user?._id) {
				throw new Error("User ID is undefined");
			}
			return apiEditSellerProfile(user?._id, data);
		},
		onSuccess,
	});

	const { mutate } = mutation;

	return { doEditSellerProfile: mutate, ...mutation };
}

export function useDeleteSeller(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (_id: string) => apiDeleteSeller(_id),
		onSuccess,
	});
	const { mutate } = mutation;
	return { doDeleteSeller: mutate, ...mutation };
}

export function useAdvertisers() {
	const { user } = useLoginStore();
	const { data, refetch } = useQuery({
		queryFn: () => apiAdvertisers(),
		queryKey: ["advertisers", user?._id],
	});
	return { data: data?.data, refetch };
}

export function useAdvertiserProfile() {
	const { user } = useLoginStore();

	const id = user?._id;

	const { data, refetch } = useQuery({
		queryFn: () => {
			if (!id) {
				throw new Error("User ID is undefined");
			}
			return apiAdvertiserProfile(id);
		},
		queryKey: ["profile", id],
	});

	return { data: data?.data, refetch };
}

export function useUpdateAdvertiserProfile(onSuccess: () => void) {
	const { user } = useLoginStore();

	const mutation = useMutation({
		mutationFn: (data: TAdvetisor) => {
			if (!user?._id) {
				throw new Error("User ID is undefined");
			}
			return apiEditAdvertiserProfile(user?._id, data);
		},
		onSuccess,
	});

	const { mutate } = mutation;

	return { doEditAdvertiserProfile: mutate, ...mutation };
}

export function useDeleteAdvertiserProfile(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (_id: string) => apiDeleteAdvertiserProfile(_id),
		onSuccess,
	});
	const { mutate } = mutation;
	return { doDeleteAdvertiserProfile: mutate, ...mutation };
}

export function useTourGuides() {
	const { user } = useLoginStore();
	const { data, refetch } = useQuery({
		queryFn: () => apiTourGuides(),
		queryKey: ["tourGuides", user?._id],
	});
	return { data: data?.data, refetch };
}

export function useTourGuideProfile() {
	const { user } = useLoginStore();

	const id = user?._id;

	const { data, refetch } = useQuery({
		queryFn: () => {
			if (!id) {
				throw new Error("User ID is undefined");
			}
			return apiTourGuideProfile(id);
		},
		queryKey: ["profile", id],
	});

	return { data: data?.data, refetch };
}

export function useUpdateTourGuideProfile(onSuccess: () => void) {
	const { user } = useLoginStore();

	const mutation = useMutation({
		mutationFn: (data: TTourGuide) => {
			if (!user?._id) {
				throw new Error("User ID is undefined");
			}
			return apiEditTourGuideProfile(user?._id, data);
		},
		onSuccess,
	});

	const { mutate } = mutation;

	return { doEditTourGuideProfile: mutate, ...mutation };
}

export function useDeleteTourGuideProfile(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (_id: string) => apiDeleteTourGuideProfile(_id),
		onSuccess,
	});
	const { mutate } = mutation;
	return { doDeleteTourGuideProfile: mutate, ...mutation };
}
