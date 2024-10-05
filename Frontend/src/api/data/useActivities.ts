import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useQueryString from "use-query-string";

import { useLoginStore } from "@/store/loginStore";

import { apiActivities, apiActivity } from "../service/activities";

export function useActivities() {
	const { user } = useLoginStore();
	const { id } = user || {};
	const navigate = useNavigate();
	// @ts-expect-error - idk
	const [query] = useQueryString(window.location, navigate);

	const { data } = useQuery({
		queryFn: () => apiActivities(id, query),
		queryKey: ["activities", id, query],
	});

	return { data: data?.data };
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
