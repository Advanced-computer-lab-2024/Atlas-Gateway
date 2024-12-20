import { useTransportationAdvertiserReport } from "@/api/data/useReport";
import Filters from "@/components/Filters/Filters";
import { Flex } from "@/components/ui/flex";
import { Label } from "@/components/ui/shadcnlabel";

import TransportationChart from "../TransportationChart";

export default function TransportationAdvertiserReport() {
	const { data, meta } = useTransportationAdvertiserReport();

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

			<TransportationChart
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
