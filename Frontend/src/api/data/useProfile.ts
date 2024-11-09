import { useMutation, useQuery } from "@tanstack/react-query";

import { useLoginStore } from "@/store/loginStore";
import {
	TAdvetisor,
	TGovernor,
	TPassword,
	TSeller,
	TTourGuide,
	TTourist,
	TTransportationAdvertiser,
} from "@/types/global";

import {
	apiAdvertiserProfile,
	apiAdvertisers,
	apiChangePassword,
	apiDeleteAdvertiserProfile,
	apiDeleteGovernor,
	apiDeleteSeller,
	apiDeleteTourGuideProfile,
	apiDeleteTouristProfile,
	apiDeleteTransportationAdvertiserProfile,
	apiEditAdvertiserProfile,
	apiEditGovernorProfile,
	apiEditSellerProfile,
	apiEditTourGuideProfile,
	apiEditTouristProfile,
	apiEditTransportationAdvertiserProfile,
	apiGovernorProfile,
	apiRequestDeleteAdvertiserProfile,
	apiRequestDeleteSellerProfile,
	apiRequestDeleteTourGuideProfile,
	apiRequestDeleteTouristProfile,
	apiSellerProfile,
	apiSellers,
	apiTourGuideProfile,
	apiTourGuides,
	apiTouristProfile,
	apiTourists,
	apiTransportationAdvertiserProfile,
	apiTransportationAdvertisers,
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
	const { user, setUser } = useLoginStore();

	const mutation = useMutation({
		mutationFn: (data: TTourist) => {
			if (!user?._id) {
				throw new Error("User ID is undefined");
			}
			if (data?.currency && data?.currency !== user.currency) {
				setUser({ ...user, currency: data.currency });
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

export function useRequestDeleteTouristProfile(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (_id: string) => apiRequestDeleteTouristProfile(_id),
		onSuccess,
	});
	const { mutate } = mutation;
	return { doRequestDeleteTouristProfile: mutate, ...mutation };
}

export function useSellers() {
	const { user } = useLoginStore();
	const { data, refetch } = useQuery({
		queryFn: () => apiSellers(),
		queryKey: ["sellers", user?._id],
	});
	return { data: data?.data, refetch };
}

export function useSellerProfile(sellerId?: string) {
	const { user } = useLoginStore();

	const id = user?._id;

	const { data, refetch } = useQuery({
		queryFn: () => {
			if (!id) {
				throw new Error("User ID is undefined");
			}
			return apiSellerProfile(sellerId ?? id);
		},
		queryKey: ["profile", sellerId ?? id],
	});

	return { data: data?.data, refetch };
}
export function useUpdateSellerProfile(onSuccess: () => void) {
	const { user } = useLoginStore();

	const mutation = useMutation({
		mutationFn: (data: Partial<TSeller>) => {
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

export function useRequestDeleteSellerProfile(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (_id: string) => apiRequestDeleteSellerProfile(_id),
		onSuccess,
	});
	const { mutate } = mutation;
	return { doRequestDeleteSellerProfile: mutate, ...mutation };
}

export function useGovernorProfile() {
	const { user } = useLoginStore();

	const id = user?._id;

	const { data, refetch } = useQuery({
		queryFn: () => {
			if (!id) {
				throw new Error("User ID is undefined");
			}
			return apiGovernorProfile(id);
		},
		queryKey: ["profile", id],
	});

	return { data: data?.data, refetch };
}

export function useUpdateGovernorProfile(onSuccess: () => void) {
	const { user } = useLoginStore();

	const mutation = useMutation({
		mutationFn: (data: Partial<TGovernor>) => {
			if (!user?._id) {
				throw new Error("User ID is undefined");
			}
			return apiEditGovernorProfile(user?._id, data);
		},
		onSuccess,
	});

	const { mutate } = mutation;

	return { doEditGovernorProfile: mutate, ...mutation };
}
export function useDeleteGovernor(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (_id: string) => apiDeleteGovernor(_id),
		onSuccess,
	});
	const { mutate } = mutation;
	return { doDeleteGoverner: mutate, ...mutation };
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
		mutationFn: (data: Partial<TAdvetisor>) => {
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

export function useRequestDeleteAdvertiserProfile(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (_id: string) => apiRequestDeleteAdvertiserProfile(_id),
		onSuccess,
	});
	const { mutate } = mutation;
	return { doRequestDeleteAdvertiserProfile: mutate, ...mutation };
}

export function useTransportationAdvertisers() {
	const { user } = useLoginStore();
	const { data, refetch } = useQuery({
		queryFn: () => apiTransportationAdvertisers(),
		queryKey: ["advertisers", user?._id],
	});
	return { data: data?.data, refetch };
}

export function useTransportationAdvertiserProfile() {
	const { user } = useLoginStore();

	const id = user?._id;

	const { data, refetch } = useQuery({
		queryFn: () => {
			if (!id) {
				throw new Error("User ID is undefined");
			}
			return apiTransportationAdvertiserProfile(id);
		},
		queryKey: ["profile", id],
	});

	return { data: data?.data, refetch };
}

export function useUpdateTransportationAdvertiserProfile(
	onSuccess: () => void,
) {
	const { user } = useLoginStore();

	const mutation = useMutation({
		mutationFn: (data: Partial<TTransportationAdvertiser>) => {
			if (!user?._id) {
				throw new Error("User ID is undefined");
			}
			return apiEditTransportationAdvertiserProfile(user?._id, data);
		},
		onSuccess,
	});

	const { mutate } = mutation;

	return { doEditTransportationAdvertiserProfile: mutate, ...mutation };
}

export function useDeleteTransportationAdvertiserProfile(
	onSuccess: () => void,
) {
	const mutation = useMutation({
		mutationFn: (_id: string) =>
			apiDeleteTransportationAdvertiserProfile(_id),
		onSuccess,
	});
	const { mutate } = mutation;
	return { doDeleteTransportationAdvertiserProfile: mutate, ...mutation };
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
		mutationFn: (data: Partial<TTourGuide>) => {
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

export function useRequestDeleteTourGuideProfile(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (_id: string) => apiRequestDeleteTourGuideProfile(_id),
		onSuccess,
	});
	const { mutate } = mutation;
	return { doRequestDeleteTourGuideProfile: mutate, ...mutation };
}
