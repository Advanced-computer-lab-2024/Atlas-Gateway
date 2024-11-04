import { useQuery } from "@tanstack/react-query";
import { useLoginStore } from "@/store/loginStore";
import { useQueryString } from "./useQueryString";
import { apiComplaint, apiComplaints } from "../service/complaints";
import { useParams } from "react-router-dom";


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

