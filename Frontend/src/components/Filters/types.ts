export type SelectItem = {
	label: string;
	value: string | number;
};

type TFilterType = {
	label: string;
	isLoading?: boolean;
	filterName: string;
	type: "checkbox" | "date" | "range";
};

export type TCheckboxFilter = TFilterType & {
	type: "checkbox";
	options: SelectItem[];
};

export type TRangeFilter = TFilterType & {
	type: "range";
};

export type TDateFilter = TFilterType & {
	type: "date";
};

export type TFilter = TCheckboxFilter | TRangeFilter | TDateFilter;

export type TFilters = { [key: string]: TFilter };
