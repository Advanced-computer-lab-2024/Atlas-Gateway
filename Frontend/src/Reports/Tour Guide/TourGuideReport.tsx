import { useTourGuideReport } from "@/api/data/useReport";
import Filters from "@/components/Filters/Filters";
import { Flex } from "@/components/ui/flex";
import { Label } from "@/components/ui/shadcnlabel";

import ItinerariesChart from "../ItitnerariesChart";

export default function TourGuideReport() {
	const { data, meta } = useTourGuideReport();

	return (
		<Flex
			className="w-full h-full items-center overflow-y-scroll "
			isColumn
		>
			<Flex>
				<Label>Advertiser Report</Label>
				<Label>Total Sales:{meta?.totalSales}</Label>
				<Label>Total Bookings:{meta?.totalBookings}</Label>
			</Flex>

			<Filters
				filters={{
					date: {
						// TODO: WIP
						filterName: "date",
						label: "Date",
						type: "date",
					},
				}}
			/>

			<ItinerariesChart
				data={data ?? []}
				metaData={
					meta ?? {
						totalSales: 0,
						totalBookings: 0,
					}
				}
			/>
		</Flex>
	);
}
