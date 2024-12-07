import React from "react";
import { useGetNotifications } from "@/api/data/useNotifications";
import NotificationCard from "./NotificationCard";
import { TNotification } from "@/types/global";
import NotificationCardCopy from "./NotificationCard copy";

export default function Notifications() {
  const { data, isLoading, error } = useGetNotifications();

  // Sort notifications by 'read' status: unread notifications will be displayed first
  // const sortedNotifications = data?.sort((a: TNotification, b: TNotification) => {
  //   if (a.read === b.read) return 0;
  //   return a.read ? 1 : -1; // Unread notifications (read: false) come before read notifications (read: true)
  // });

  if (isLoading) {
    return <div>Loading notifications...</div>;
  }

  // if (error) {
  //   return <div>Error loading notifications: {error}</div>;
  // }

  return (
    <div
      className="fixed top-16 right-40 max-h-[80vh] overflow-auto z-50 w-80 bg-white shadow-lg rounded-lg border border-gray-200 p-4 space-y-4"
    >
      {/* If there are notifications, map over them */}
      {/* {sortedNotifications?.length > 0 ? (
        sortedNotifications.map((notification: TNotification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))
      ) : (
        <div>No notifications available.</div>
      )} */}

      <NotificationCardCopy />
      <NotificationCardCopy />

    </div>
  );
}
