import { formatDate } from "date-fns";
import { Eye, RotateCw } from "lucide-react";

import { useOrders } from "@/api/data/useOrders";
//import { useTouristProfile } from "@/api/data/useProfile";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { TOrder } from "@/types/global";

export default function TouristOrders() {
	//const { data, refetch } = useTouristProfile();
	const { data, refetch } = useOrders();
	console.log(data);
	return (
		<Table className="shadow-lg h-full">
			<TableHeader>
				<TableRow>
					<TableHead className="p-3">Order No.</TableHead>
					<TableHead className="p-3">Order Date</TableHead>
					<TableHead className="p-3">Number of Items</TableHead>
					<TableHead className="p-3">Total Cost</TableHead>
					<TableHead className="p-3">Status</TableHead>
					<TableHead className="cursor-pointer hover:text-[#2b58ed] w-1">
						<RotateCw onClick={() => refetch()} />
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.map((order: TOrder) => (
					<TableRow key={order._id} className="cursor-pointer">
						<TableCell>{order._id}</TableCell>
						<TableCell>
							{formatDate(
								new Date(order.date || "0"),
								"dd/MM/yyyy HH:mm:ss a",
							)}
						</TableCell>
						<TableCell>{order.products.length}</TableCell>
						<TableCell>{order.totalPrice}</TableCell>
						<TableCell>{order.status}</TableCell>
						<TableCell>
							<Eye
								onClick={() => {
									window.location.href = `/orders/${order._id}`;
								}}
								className="cursor-pointer hover:text-[#2b58ed]"
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
