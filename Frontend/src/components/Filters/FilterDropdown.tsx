import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

import CheckboxFilter from "./Filters/CheckboxFilter";
import DateFilter from "./Filters/DateFilter";
import RangeFilter from "./Filters/RangeFilter";
import { TCheckboxFilter, TDateFilter, TFilter, TRangeFilter } from "./types";
import { useQueryString } from "@/api/data/useQueryString";

export default function FilterDropdown({
	children,
	filter,
}: PropsWithChildren<{
	filter: TFilter;
}>) {
	const navigate = useNavigate();
	const [query, updateQuery] = useQueryString();

	const removefilter = (filter: TFilter) => {
		const newQuery = { ...query };
		delete newQuery[filter.filterName];
		updateQuery(newQuery);
	};

	const FilterContent = () => {
		switch (filter.type) {
			case "checkbox":
				return <CheckboxFilter filter={filter as TCheckboxFilter} />;
			case "date":
				return <DateFilter filter={filter as TDateFilter} />;
			case "range":
				return <RangeFilter filter={filter as TRangeFilter} />;
		}
	};

	return <FilterContent />;
}
