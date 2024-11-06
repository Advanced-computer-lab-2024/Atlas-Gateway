import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";



import { useLoginStore } from "@/store/loginStore";



import { apiComplaint, apiComplaints, apiComplaintsUpdateByAdmin } from "../service/complaints";
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
		id: string
	}>();

	const { data } = useQuery({
		queryFn: () => apiComplaint(id),
		queryKey: ["complaint", id],
	});

	return { data: data?.data };

}

// update Complaint by Admin
export function useComplaintsUpdateByAdmin() {
	const { user } = useLoginStore();
	const { _id: replyedBy } = user || {}; // Set replyedBy from user ID

	const [state, setState] = useState(''); // Example state
	const [reply, setReply] = useState(''); // Example reply

	const { data, refetch } = useQuery({
		queryFn: () => {
			if (!replyedBy) {
				throw new Error("User ID is undefined");
			}
			return apiComplaintsUpdateByAdmin("complaint_id_here", { state, reply }, replyedBy);
		},
		queryKey: ["complaint", replyedBy, state, reply],
	});

	return { data: data?.data, refetch, setState, setReply };
}