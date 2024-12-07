import { useSellerSalesReport } from "@/api/data/useReport";
import Filters from "@/components/Filters/Filters";
import { Flex } from "@/components/ui/flex";
import { Label } from "@/components/ui/shadcnlabel";

import ProductsChart from "../ProductsChart";

export default function SellerReport() {
	const { data, meta } = useSellerSalesReport();

	return (
		<Flex
			className="w-full h-full items-center overflow-y-scroll "
			isColumn
		>
			<Flex>
				<Label>Seller Report</Label>
				<Label>Total Sales:{meta?.totalSales}</Label>
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

			<ProductsChart
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
