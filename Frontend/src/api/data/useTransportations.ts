import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { useLoginStore } from "@/store/loginStore";
import { TTransportation } from "../../types/global";
import { apiBookTransportation, apiCancelTransportationBooking, apiCreateTransportation, apiDeleteTransportation, apiTransportation, apiTransportations, apiUpdateTransportation } from "../service/transportations";

// export function useTransportations() {
// 	const { user } = useLoginStore();
// 	const { _id } = user || {};
// 	const [query] = useQueryString();

// 	const { data, refetch } = useQuery({
// 		queryFn: () =>
// 			user?.type === EAccountType.TransportationAdvertiser
// 				? apiAdvertisorTransportations(
// 						_id,
// 						user?.type ?? EAccountType.TransportationAdvertiser,
// 					)
// 				: apiTransportations(
// 					_id,
// 					user?.type ?? EAccountType.Tourist),
// 		queryKey: ["transportations", _id, query],
// 	});

// 	return { data: data?.data, refetch };
// }

export function useTransportations() {
	const { user } = useLoginStore();
	const { _id } = user || {};
	const type = user?.type.toString() || ""; 
  
	const { data, refetch } = useQuery({
	  queryFn: () => apiTransportations(_id, type), 
	  queryKey: ["transportation", _id, type], 
	});
	
	return { data: data?.data, refetch};
}  

export function useTransportation() {
	const { id } = useParams<{
		id: string;
	}>();

	const { data, refetch } = useQuery({
		queryFn: () => apiTransportation(id),
		queryKey: ["transportation", id],
	});

	return { data: data?.data, refetch };
}

export function useCreateTransportation(onSuccess: () => void) {
	const { user } = useLoginStore();
	const mutation = useMutation({
		mutationFn: (data: TTransportation) => {
			const { _id } = user || {};

			if (!_id) {
				throw new Error("User ID is undefined");
			}

			return apiCreateTransportation(data, _id);
		},
		onSuccess,
	});

	const { mutate } = mutation;

	return { doCreateTransportation: mutate, ...mutation };
}

export function useUpdateTransportation(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: apiUpdateTransportation,
		onSuccess,
	});

	const { mutate } = mutation;

	return { doUpdateTransportation: mutate, ...mutation };
}

export function useDeleteTransportation(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (_id: string) => apiDeleteTransportation(_id),
		onSuccess,
	});

	const { mutate } = mutation;

	return { doDeleteTransportation: mutate, ...mutation };
}

export function useBookTransportation(onSuccess: () => void) {
	const { user } = useLoginStore();
	if (!user?._id) {
		throw new Error("User ID is undefined");
	}
	const mutation = useMutation({
		mutationFn: (_id: string) => apiBookTransportation(_id, user?._id),
		onSuccess,
	});

	const { mutate } = mutation;

	return { doBookTransportation: mutate, ...mutation };
}

export function useCancelTransportationBooking(onSuccess: () => void) {
	const { user } = useLoginStore();
	if (!user?._id) {
		throw new Error("User ID is undefined");
	}
	const mutation = useMutation({
		mutationFn: (_id: string) =>
			apiCancelTransportationBooking(_id, user?._id),
		onSuccess,
	});

	const { mutate } = mutation;

	return { doCancelTransportationBooking: mutate, ...mutation };
}