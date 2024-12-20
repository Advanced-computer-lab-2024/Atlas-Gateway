import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { toast } from "@/hooks/use-toast";
import { useLoginStore } from "@/store/loginStore";
import { TComplaint } from "@/types/global";

import {
	apiAddComplaint,
	apiComplaint,
	apiComplaints,
	apiProfileComplaints,
	apiUpdateComplaint,
} from "../service/complaints";
import { onError } from "./onError";
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

export function useProfileComplaints() {
	const { user } = useLoginStore();
	const { _id } = user || {};
	const [query] = useQueryString();

	const { data, refetch } = useQuery({
		queryFn: () => apiProfileComplaints(_id, query),
		queryKey: ["profile-complaints", _id, query],
	});

	return { data: data?.data, refetch };
}

export function useAddComplaint(onSuccess: () => void) {
	const { user } = useLoginStore();
	const { _id } = user || { _id: "" };

	const mutation = useMutation({
		mutationFn: (data: TComplaint) => apiAddComplaint(_id, data),
		onError,
		onSuccess: () => {
			onSuccess();
			toast({
				title: "Complaint created successfully!",
			});
		},
	});

	const { mutate } = mutation;

	return { doAddComplaint: mutate, ...mutation };
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

export function useUpdateComplaint(onSuccess: () => void) {
	const { user } = useLoginStore();
	const { id } = useParams<{ id: string }>();

	const mutation = useMutation({
		mutationFn: (data: Partial<TComplaint>) => {
			const userid = user?._id;
			return apiUpdateComplaint({ _id: id, ...data }, userid!);
		},
		onError,
		onSuccess: () => {
			onSuccess();
			toast({
				title: "Complaint updated successfully!",
			});
		},
	});

	const { mutate } = mutation;

	return { doUpdateComplaintByAdmin: mutate, ...mutation };
}
