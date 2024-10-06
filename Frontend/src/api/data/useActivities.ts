import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { useLoginStore } from "@/store/loginStore";

import { apiActivities, apiActivity } from "../service/activities";
import { useQueryString } from "./useQueryString";

export function useActivities() {
	const { user } = useLoginStore();
	const { _id } = user || {};

	const [query] = useQueryString();

	const { data } = useQuery({
		queryFn: () => apiActivities(_id, query),
		queryKey: ["activities", _id, query],
	});

	return { data: data?.data?.data, meta: data?.data?.metaData };
}

export function useActivity() {
	const { id } = useParams<{
		id: string;
	}>();

	const { data } = useQuery({
		queryFn: () => apiActivity(id),
		queryKey: ["activity", id],
	});

	return { data: data?.data };
}
