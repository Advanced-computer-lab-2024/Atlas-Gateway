import { useQuery } from "@tanstack/react-query";
import { query } from "express";

import { useLoginStore } from "../../store/loginStore";
import { apiOrder, apiOrders } from "../service/orders";

export const useOrders = () => {
	const { user } = useLoginStore();
	const { _id } = user || {};
	const { data, refetch } = useQuery({
		queryFn: () => apiOrders(_id),
		queryKey: ["orders", user?._id],
	});

	console.log(data);

	return { data: data?.data, refetch };
};

export const useOrder = (id: string | undefined) => {
	const { data, refetch } = useQuery({
		queryFn: () => apiOrder(id),
		queryKey: ["order", id],
	});

	return { data: data?.data, refetch };
};
