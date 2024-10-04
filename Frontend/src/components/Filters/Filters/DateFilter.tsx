import { useState } from "react";

import { DateRangePicker } from "@/components/ui/date-range-picker";

import { TDateFilter } from "../types";

export default function DateFilter({ filter }: { filter: TDateFilter }) {
	const [startDate, setStartDate] = useState<Date | undefined>(undefined);
	const [endDate, setEndDate] = useState<Date | undefined>(undefined);

	return (
		<DateRangePicker
			onUpdate={(values) => console.log(values)}
			align="start"
			locale="en-GB"
			showCompare={false}
		/>
	);
}
