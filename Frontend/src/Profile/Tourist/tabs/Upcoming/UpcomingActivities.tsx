import { formatDate } from "date-fns";
import { Eye, EyeOff, RotateCw } from "lucide-react";

import { useUpcomingActivities } from "@/api/data/useActivities";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import useCurrency from "@/hooks/useCurrency";
import { TActivity } from "@/types/global";

function UpcomingActivities() {
	const convertCurrency = useCurrency();
	const { data, refetch: refetchUpcoming } = useUpcomingActivities();
	return (
		<Table className="shadow-lg h-full">
			<TableHeader>
				<TableRow>
					<TableHead className="p-3">Description</TableHead>
					<TableHead className="p-3">Date & Time</TableHead>
					<TableHead className="p-3">Location</TableHead>
					<TableHead className="p-3">min price</TableHead>
					<TableHead className="p-3">max price</TableHead>
					<TableHead className="cursor-pointer hover:text-[#2b58ed] w-1">
						<RotateCw onClick={() => refetchUpcoming()} />
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.map((activity: TActivity) => (
					<TableRow key={activity._id} className="cursor-pointer">
						<TableCell>{activity.description}</TableCell>
						<TableCell>{activity.dateTime}</TableCell>
						<TableCell>{activity.location}</TableCell>
						<TableCell>
							{convertCurrency(activity.minPrice)}
						</TableCell>
						<TableCell>
							{convertCurrency(activity.maxPrice)}
						</TableCell>
						<TableCell>
							{activity._id ? (
								<Eye
									onClick={() => {
										window.location.href = `/activities/${activity._id}`;
									}}
									className="cursor-pointer hover:text-[#2b58ed]"
								/>
							) : (
								<EyeOff />
							)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

export default UpcomingActivities;
