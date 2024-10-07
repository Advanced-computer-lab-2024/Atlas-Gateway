import { set } from "lodash";
import { useCallback } from "react";

import { useQueryString } from "@/api/data/useQueryString";

import CheckboxFilter from "./Filters/CheckboxFilter";
import DateFilter from "./Filters/DateFilter";
import RangeFilter from "./Filters/RangeFilter";
import { TCheckboxFilter, TDateFilter, TFilter, TRangeFilter } from "./types";

export default function FilterDropdown({
	filter,
	setActiveFilters,
}: {
	filter: TFilter;
	setActiveFilters: React.Dispatch<React.SetStateAction<TFilter[]>>;
}) {
	const [query, updateQuery] = useQueryString();

	const removeFilter = useCallback(() => {
		const newQuery = { ...query };
		set(newQuery, filter.filterName, undefined);
		updateQuery(newQuery);
		setActiveFilters((prev) =>
			prev.filter((filter) => filter.filterName !== filter.filterName),
		);
	}, [filter.filterName, query, setActiveFilters, updateQuery]);

	const FilterContent = () => {
		switch (filter.type) {
			case "checkbox":
				return (
					<CheckboxFilter
						filter={filter as TCheckboxFilter}
						removeFilter={removeFilter}
					/>
				);
			case "date":
				return (
					<DateFilter
						filter={filter as TDateFilter}
						removeFilter={removeFilter}
					/>
				);
			case "range":
				return (
					<RangeFilter
						filter={filter as TRangeFilter}
						removeFilter={removeFilter}
					/>
				);
		}
	};

	return <FilterContent />;
}
