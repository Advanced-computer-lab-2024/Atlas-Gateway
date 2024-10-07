import { useCallback, useState } from "react";

import { useQueryString } from "@/api/data/useQueryString";
import Label from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Flex } from "@/components/ui/flex";
import { Input } from "@/components/ui/input";

import { TRangeFilter } from "../types";

export default function RangeFilter({
	filter,
	removeFilter,
}: {
	filter: TRangeFilter;
	removeFilter: () => void;
}) {
	const [start, setStart] = useState("");
	const [end, setEnd] = useState("");

	const [query, updateQuery] = useQueryString();

	const applyFilter = useCallback(() => {
		updateQuery({
			...query,
			[filter.filterName]: `${start === "" ? "null" : start},${end === "" ? "null" : end}`,
		});
	}, [end, filter.filterName, query, start, updateQuery]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost">{filter.label}</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-52">
				<Flex isColumn gap="2">
					<Flex isColumn gap="2">
						<Label.Mid300>From</Label.Mid300>
						<Input
							value={start}
							onChange={(e) => setStart(e.target.value)}
						/>
					</Flex>
					<Flex isColumn gap="2">
						<Label.Mid300>To</Label.Mid300>
						<Input
							value={end}
							onChange={(e) => setEnd(e.target.value)}
						/>
					</Flex>
					<hr />
					<Flex justify="between">
						<Button onClick={removeFilter}>Remove</Button>
						<Button onClick={applyFilter}>Apply</Button>
					</Flex>
				</Flex>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
