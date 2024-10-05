import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import useQueryString from "use-query-string";

import CheckboxFilter from "./Filters/CheckboxFilter";
import DateFilter from "./Filters/DateFilter";
import RangeFilter from "./Filters/RangeFilter";
import { TCheckboxFilter, TDateFilter, TFilter, TRangeFilter } from "./types";

export default function FilterDropdown({
	children,
	filter,
}: PropsWithChildren<{
	filter: TFilter;
}>) {
	const navigate = useNavigate();
	const [query, setQuery] = useQueryString(window.location, navigate);

	const removefilter = (filter: TFilter) => {
		const newQuery = { ...query };
		delete newQuery[filter.filterName];
		setQuery(newQuery);
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
