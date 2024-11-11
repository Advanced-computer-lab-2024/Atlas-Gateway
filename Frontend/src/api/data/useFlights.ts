import { useMutation } from "@tanstack/react-query";

import { useLoginStore } from "@/store/loginStore";

import { IFlight } from "../../../../Backend/src/Models/Flight/flight.model";
import { apiBookFlight, apiSearchFlights } from "../service/flights";

export function useSearchFlights(onSuccess: (response: any) => void) {
	const mutation = useMutation({
		mutationFn: apiSearchFlights,
		onSuccess,
	});

	const { mutate, isPending } = mutation;

	return { doSearchFlights: mutate, ...mutation, isPending };
}

export function useBookFlight(onSuccess: () => void) {
	const { user } = useLoginStore();
	const mutation = useMutation({
		mutationFn: (flight: IFlight) => apiBookFlight(flight, user?._id!),
		onSuccess,
	});

	const { mutate, isPending } = mutation;

	return { doBookFlight: mutate, ...mutation, isPending };
}
