import { useQueryString } from "@/api/data/useQueryString";

import CheckboxFilter from "./Filters/CheckboxFilter";
import DateFilter from "./Filters/DateFilter";
import RangeFilter from "./Filters/RangeFilter";
import { TCheckboxFilter, TDateFilter, TFilter, TRangeFilter } from "./types";

export default function FilterDropdown({ filter }: { filter: TFilter }) {
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
