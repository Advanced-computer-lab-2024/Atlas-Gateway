import { useSalesReport } from "@/api/data/useReport";
import Filters from "@/components/Filters/Filters";
import { Flex } from "@/components/ui/flex";
import { Label } from "@/components/ui/shadcnlabel";

import ActivitiesChart from "../ActivitiesChart";
import ItinerariesChart from "../ItitnerariesChart";
import ProductsChart from "../ProductsChart";

export default function AdminReport() {
	const [data, meta] = useSalesReport();

	return (
		<Flex>
			<Flex>
				<Label>Admin Report</Label>
				<Label>Total Sales:{meta.totalSales}</Label>
				<Label>Total Bookings:{meta.totalBookings}</Label>
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
			<ItinerariesChart itineraries={data.itineraries} />
			<ProductsChart products={data.products} />
			<ActivitiesChart activities={data.activities} />
		</Flex>
	);
}
