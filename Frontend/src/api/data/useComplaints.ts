import { useQuery } from "@tanstack/react-query";



import { useLoginStore } from "@/store/loginStore";



import { useQueryString } from "./useQueryString";
import { apiComplaints } from "../service/categories";


export function useComplaints() {
	const { user } = useLoginStore();
	const { _id } = user || {};
	const [query] = useQueryString();

	const { data, refetch } = useQuery({
		queryFn: () => apiComplaints(_id),
		queryKey: ["category", _id, query],
	});

	return { data: data?.data, refetch };
}

