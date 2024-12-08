import { useAdvertiserReport } from "@/api/data/useReport";
import Filters from "@/components/Filters/Filters";
import Label from "@/components/ui/Label";
import { Flex } from "@/components/ui/flex";

import ActivitiesChart from "../ActivitiesChart";

export default function AdvertiserReport() {
	const { data, meta } = useAdvertiserReport();

	return (
		<Flex className="w-full h-fit items-center overflow-y-scroll" isColumn gap="2">
			<Flex gap="4">
				<Label.Mid300>Advertiser Report</Label.Mid300>
				<Label.Mid300>Total Sales:{meta?.totalSales}</Label.Mid300>
				<Label.Mid300>
					Total Bookings:{meta?.totalBookings}
				</Label.Mid300>
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
			<ActivitiesChart
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
