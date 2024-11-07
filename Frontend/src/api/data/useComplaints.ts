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
		queryFn: () => apiComplaints(_id),
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

// update Complaint by Admin
export function useComplaintsUpdateByAdmin(onSuccess: () => void) {
	const { user } = useLoginStore();
	const { id } = useParams<{ id: string }>();

	const mutation = useMutation({
		mutationFn: (data: Partial<TComplaint>) => {
			const userid = user?._id;

			// Check if userid is available
			console.log("User ID:", userid);

			if (!userid) {
				console.error("User ID is undefined");
				throw new Error("User ID is undefined");
			}

			console.log("Updating complaint with data:", { _id: id, ...data });

			// Perform the API call
			return apiComplaintsUpdateByAdmin({ _id: id, ...data }, userid);
		},
		onSuccess: () => {
			console.log("Update successful");
			onSuccess();
		},
		onError: (error) => {
			console.error("Error in mutation:", error);
		},
	});

	const { mutate } = mutation;

	return { doUpdateComplaintByAdmin: mutate, ...mutation };
}
