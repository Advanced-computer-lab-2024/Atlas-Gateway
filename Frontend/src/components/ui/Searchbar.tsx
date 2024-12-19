import { debounce } from "lodash";
import { Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useQueryString } from "@/api/data/useQueryString";

import { Flex } from "./flex";
import { Input } from "./input";

export type SearchBarProps = {
	placeholder?: string;
	searchKey?: string;
};

export function Searchbar() {
	const [search, setSearch] = useState("");

	const [queryState, updateQuery] = useQueryString();
	const searchValue = queryState?.search || "";

	const updateSearchQuery = useMemo(
		() =>
			debounce((newValue) => {
				const { search: _, ...rest } = queryState;
				updateQuery(
					{
						...(newValue && { search: newValue }),
						...{ ...rest },
					},
					{ noMerge: true },
				);
			}, 500),
		[updateQuery, queryState],
	);

	const onSearchChange = useCallback(
		(e: { target: { value: string } }) => {
			setSearch(e.target.value);
			updateSearchQuery(e.target.value);
		},
		[updateSearchQuery],
	);

	const onSearchClear = useCallback(() => {
		setSearch("");
		updateSearchQuery("");
	}, [updateSearchQuery]);

	useEffect(() => {
		if (searchValue) {
			setSearch(searchValue);
		}
	}, []);

	return (
		<Flex gap="1" align="center" className="relative">
			<Search className="absolute left-1" />
			{search && (
				<X
					className="absolute right-1 cursor-pointer"
					onClick={onSearchClear}
				/>
			)}
			<Input
				placeholder="Search..."
				className="w-56 bg-white pl-8 pr-8"
				onChange={onSearchChange}
				value={search}
			/>
		</Flex>
	);
}
