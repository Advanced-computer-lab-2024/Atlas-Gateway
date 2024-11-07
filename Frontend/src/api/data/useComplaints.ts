import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { useLoginStore } from "@/store/loginStore";
import { TComplaint } from "@/types/global";

import {
	apiComplaint,
	apiComplaints,
	apiComplaintsUpdateByAdmin,
} from "../service/complaints";
import { useQueryString } from "./useQueryString";

export function useComplaints() {
	const { user } = useLoginStore();
	const { _id } = user || {};
	const [query] = useQueryString();

	const { data, refetch } = useQuery({
		queryFn: () => apiComplaints(_id, query),
		queryKey: ["complaint", _id, query],
	});

	return { data: data?.data, refetch };
}

export function useComplaint() {
	const { id } = useParams<{
		id: string;
	}>();

	const { data, refetch } = useQuery({
		queryFn: () => apiComplaint(id),
		queryKey: ["complaint", id],
	});

	return { data: data?.data, refetch };
}

export function useComplaintsUpdateByAdmin(onSuccess: () => void) {
	const { user } = useLoginStore();
	const { id } = useParams<{ id: string }>();

	const mutation = useMutation({
		mutationFn: (data: Partial<TComplaint>) => {
			const userid = user?._id;
			return apiComplaintsUpdateByAdmin({ _id: id, ...data }, userid!);
		},
		onSuccess: onSuccess,
	});

	const { mutate } = mutation;

	return { doUpdateComplaintByAdmin: mutate, ...mutation };
}
