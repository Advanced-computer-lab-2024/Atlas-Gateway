import { useAdminSalesReport } from "@/api/data/useReport";
import Filters from "@/components/Filters/Filters";
import { Flex } from "@/components/ui/flex";
import { Label } from "@/components/ui/shadcnlabel";

import ActivitiesChart from "../ActivitiesChart";
import ItinerariesChart from "../ItitnerariesChart";
import ProductsChart from "../ProductsChart";

export default function AdminReport() {
	const { data, meta } = useAdminSalesReport();

	console.log(data, meta);

	return (
		<Flex
			className="w-full h-full items-center overflow-y-scroll "
			isColumn
		>
			<Flex>
				<Label>Admin Report</Label>
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
				data={data?.itineraries.data ?? []}
				metaData={
					data?.itineraries.metaData ?? {
						totalSales: 0,
						totalBookings: 0,
					}
				}
			/>
			<ProductsChart
				data={data?.products.data ?? []}
				metaData={
					data?.products.metaData ?? {
						totalSales: 0,
						totalBookings: 0,
					}
				}
			/>
			<ActivitiesChart
				data={data?.activities.data ?? []}
				metaData={
					data?.activities.metaData ?? {
						totalSales: 0,
						totalBookings: 0,
					}
				}
			/>
		</Flex>
	);
}
