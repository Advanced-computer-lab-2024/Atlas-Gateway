import { formatDate } from "date-fns";
import { X, MailOpen } from "lucide-react";

import {
    useDeleteNotification,
    useGetNotifications,
    useMarkNotificationAsRead,
} from "@/api/data/useNotifications";
import Label from "@/components/ui/Label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Flex } from "@/components/ui/flex";
import { TNotification } from "@/types/global";

export default function NotificationCardCopy() {
    const { refetch } = useGetNotifications();
    const { deleteNotification } = useDeleteNotification(() => refetch());
    const { markAsRead } = useMarkNotificationAsRead(() => refetch());

    // if (!notification) {
    //     return <div>No notifications available.</div>;
    // }

    const handleMarkAsRead = (id: string) => {
        markAsRead(id);
    };

    const handleDelete = (id: string) => {
        deleteNotification(id);
    };

    return (
        // <Card key={notification?._id} className="w-full bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
        //     <CardHeader>
        //         <Flex gap="2" align="center" justify="center" className="relative w-full">
        //             <Label.Mid500 className="justify-self-center">{notification?.type}</Label.Mid500>
        //         </Flex>
        //     </CardHeader>
        //     <CardContent>
        //         <Flex gap="2" align="center" justify="between">
        //             <Label.Mid300>{notification?.message}</Label.Mid300>
        //         </Flex>
        //         <Flex gap="2" align="center" justify="between">
        //             <Label.Mid300>
        //                 {notification?.createdAt &&
        //                     formatDate(new Date(notification?.createdAt), "dd/MM/yyyy HH:mm:ss a")}
        //             </Label.Mid300>
        //         </Flex>
        //         <div className="flex gap-4 mt-2">
        //             <X onClick={() => handleDelete(notification?._id)} className="cursor-pointer text-red-500" />
        //             <MailOpen onClick={() => handleMarkAsRead(notification?._id)} className="cursor-pointer text-blue-500" />
        //         </div>
        //     </CardContent>
        // </Card>


        <Card className="w-full bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
            <CardHeader>
                <Flex gap="2" align="center" justify="between" className="w-full">
                    <Label.Mid500 className="justify-self-start">{"Warning"}</Label.Mid500>
                    <X className="cursor-pointer text-red-500" />
                </Flex>
            </CardHeader>
            <CardContent className="relative">
                <Flex className="center between gap-2">
                    <Label.Mid300>{"Testing UI of notification"}</Label.Mid300>
                </Flex>
                <Flex className="center between gap-2">
                    <Label.Mid300>
                        {new Date() && formatDate(new Date(), "dd/MM/yyyy HH:mm a")}
                    </Label.Mid300>
                </Flex>
                <Flex className="absolute right-2 bottom-2">
                    <MailOpen className="cursor-pointer text-blue-500" />
                </Flex>
            </CardContent>
        </Card>
    );
}
