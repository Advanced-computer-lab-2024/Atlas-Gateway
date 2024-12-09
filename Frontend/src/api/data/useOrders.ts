import { useQuery } from "@tanstack/react-query";
import { query } from "express";
import { useParams } from "react-router-dom";

import { useLoginStore } from "../../store/loginStore";
import { apiOrder, apiOrders } from "../service/orders";

export const useOrders = () => {
	const { user } = useLoginStore();
	const { _id } = user || {};
	const { data, refetch } = useQuery({
		queryFn: () => apiOrders(_id),
		queryKey: ["orders", user?._id],
	});

	//console.log(data);

	return { data: data?.data, refetch };
};

export const useOrder = () => {
	const { user } = useLoginStore();
	const { _id } = user || {};
	const { id } = useParams<{
		id: string;
	}>();
	const { data, refetch } = useQuery({
		queryFn: () => apiOrder(id, _id),
		queryKey: ["order", id],
	});

	return { data: data?.data, refetch };
};
