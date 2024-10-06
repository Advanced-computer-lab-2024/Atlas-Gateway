import { useCallback, useState } from "react";

import { useQueryString } from "@/api/data/useQueryString";
import { DateRangePicker } from "@/components/ui/date-range-picker";

import { TDateFilter } from "../types";

export default function DateFilter({ filter }: { filter: TDateFilter }) {
	const [startDate, setStartDate] = useState<Date | undefined>(undefined);
	const [endDate, setEndDate] = useState<Date | undefined>(undefined);

	const [query, updateQuery] = useQueryString();

	const removeFilter = useCallback(() => {
		const newQuery = { ...query };
		delete newQuery[filter.filterName];
		updateQuery(newQuery);
	}, [filter.filterName, query, updateQuery]);

	return (
		<DateRangePicker
			onUpdate={(values) => console.log(values)}
			align="start"
			locale="en-GB"
			showCompare={false}
		/>
	);
}
