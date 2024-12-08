import React from "react";

import { useGetNotifications } from "@/api/data/useNotifications";
import { TNotification } from "@/types/global";

import NotificationCard from "./NotificationCard";
import NotificationCardCopy from "./NotificationCard copy";

export default function Notifications() {
	const { data, refetch } = useGetNotifications();

	return (
		<div className="fixed top-16 right-40 max-h-[80vh] overflow-auto z-50 w-80 bg-white shadow-lg rounded-lg border border-gray-200 p-4 space-y-4">
			{data?.map((notification: TNotification) => (
				<NotificationCard notification={notification} />
			))}
		</div>
	);
}
