import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { useLoginStore } from "@/store/loginStore";
import { TNotification } from "@/types/global";

import {
	apiDeleteNotification,
	apiGetNotifications,
	apiMarkNotificationAsRead,
} from "../service/notifications";

export function useGetNotifications() {
	const { user } = useLoginStore();
	const { _id } = user || {};

	const q = useQuery({
		queryFn: () => apiGetNotifications(_id),
		queryKey: ["notifications", _id],
	});

	const { data } = q;

	return { ...q, data: data?.data };
}

export function useMarkNotificationAsRead(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (id: string) => apiMarkNotificationAsRead(id),
		onSuccess,
	});

	const { mutate } = mutation;
	return { markAsRead: mutate, ...mutation };
}

export function useDeleteNotification(onSuccess: () => void) {
	const { user } = useLoginStore();
	const { type, _id } = user || {};
	const mutation = useMutation({
		mutationFn: (id: string) => apiDeleteNotification(id, type, _id),
		onSuccess,
	});

	const { mutate } = mutation;
	return { deleteNotification: mutate, ...mutation };
}
