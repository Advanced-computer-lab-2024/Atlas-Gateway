import { useMutation, useQuery } from "@tanstack/react-query";

import { useLoginStore } from "@/store/loginStore";

import { apiGetNotifications, apiMarkNotificationAsRead, apiDeleteNotification } from "../service/notifications";
import { useQueryString } from "./useQueryString";
import { useParams } from "react-router-dom";
import { TApiResponse } from "../service/types";
import { TNotification } from "@/types/global";

export function useGetNotifications() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery<TApiResponse<TNotification[]>, Error>({
    queryFn: () => {
      if (!id) {
        return Promise.reject("User ID is required");
      }
      return apiGetNotifications(id); // This should return a TApiResponse<TNotification[]>
    },
    queryKey: ["notification", id],
    enabled: !!id, // Ensures the query is only run if id exists
  });

  return {
    data: data?.data || [], // Access the correct 'data' field from the response
    isLoading,
    error,
  };
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
  const mutation = useMutation({
    mutationFn: (id: string) => apiDeleteNotification(id),
    onSuccess,
  });

  const { mutate } = mutation;
  return { deleteNotification: mutate, ...mutation };
}
