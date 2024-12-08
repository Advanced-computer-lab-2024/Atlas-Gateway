import { formatDate } from "date-fns";
import { Eye, EyeOff, RotateCw } from "lucide-react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import useCurrency from "@/hooks/useCurrency";
import { usePastItineraries } from "@/api/data/useItineraries"; 
function PastItineraries() {
     // Fetch past activities
	  const {data: pastItineraries,refetch: refetchPast} = usePastItineraries();
      const convertCurrency = useCurrency();

  return (
    <Table className="shadow-lg h-full">
					<TableHeader>
						<TableRow>
							<TableHead className="p-3">Description</TableHead>
							<TableHead className="p-3">Price</TableHead>
							<TableHead className="p-3">Date & Time</TableHead>
							<TableHead className="p-3">Location</TableHead>
							<TableHead className="cursor-pointer hover:text-[#2b58ed] w-1">
								<RotateCw onClick={() => refetchPast()} />
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{pastItineraries?.map((activity) => (
							<TableRow key={activity._id} className="cursor-pointer">
								<TableCell>
									{activity.description
										? activity.description.substring(0, 100)
										: "N/A"}
								</TableCell>
								<TableCell>
									{convertCurrency(activity?.minPrice)}-
									{convertCurrency(activity?.maxPrice)}
								</TableCell>
								<TableCell>
									{formatDate(
										new Date(activity?.dateTime || "0"),
										"dd/MM/yyyy HH:mm:ss a",
									)}
								</TableCell>
								<TableCell>{activity?.location}</TableCell>
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
  )
}

export default PastItineraries
