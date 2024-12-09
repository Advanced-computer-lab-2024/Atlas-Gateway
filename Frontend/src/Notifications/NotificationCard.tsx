import { formatDate } from "date-fns";
import { MailOpen, X } from "lucide-react";

import {
	useDeleteNotification,
	useGetNotifications,
	useMarkNotificationAsRead,
} from "@/api/data/useNotifications";
import AreYouSure from "@/components/ui/AreYouSure";
import Label from "@/components/ui/Label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";
import { TNotification } from "@/types/global";

export default function NotificationCard({
	notification,
}: {
	notification: TNotification;
}) {
	const { refetch } = useGetNotifications();
	const { deleteNotification } = useDeleteNotification(() => refetch());
	const { markAsRead } = useMarkNotificationAsRead(() => refetch());

	if (!notification) {
		return <div>No notifications available.</div>;
	}

	const handleMarkAsRead = (id: string) => {
		markAsRead(id);
	};

	const handleDelete = (id: string) => {
		deleteNotification(id);
	};

	return (
		<Card
			key={notification?._id}
			className="w-full bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden"
		>
			<CardHeader>
				<Flex
					gap="2"
					align="center"
					justify="between"
					className="w-full"
				>
					<Label.Mid500 className="justify-self-start">
						{notification?.type}
					</Label.Mid500>
					<AreYouSure
						title="Are you sure you want to delete this notification?"
						description="This action is irreversible"
						onConfirm={() => {
							handleDelete(notification?._id);
						}}
					>
						<X className="cursor-pointer text-red-500" />
					</AreYouSure>
				</Flex>
			</CardHeader>
			<CardContent className="relative">
				<Flex className="center between gap-2">
					<Label.Mid300
						className={notification?.isRead ? "" : "font-bold"}
					>
						{notification?.message}
					</Label.Mid300>
				</Flex>
				<Flex className="center between gap-2">
					<Label.Mid300>
						{notification?.createdAt &&
							formatDate(
								notification?.createdAt,
								"dd/MM/yyyy HH:mm a",
							)}
					</Label.Mid300>
				</Flex>
				<Flex className="absolute right-2 bottom-2">
					{!notification.isRead && (
						<MailOpen
							onClick={() => handleMarkAsRead(notification?._id)}
							className="cursor-pointer text-blue-500"
						/>
					)}
				</Flex>
			</CardContent>
		</Card>
	);
}
