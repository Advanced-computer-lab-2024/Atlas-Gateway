import { useCallback, useState } from "react";

import { useQueryString } from "@/api/data/useQueryString";
import Label from "@/components/ui/Label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Flex } from "@/components/ui/flex";

import { SelectItem, TCheckboxFilter } from "../types";

export default function CheckboxFilter({
	filter,
	removeFilter,
}: {
	filter: TCheckboxFilter;
	removeFilter: () => void;
}) {
	const [selected, setSelected] = useState<SelectItem[]>([]);

	const [query, updateQuery] = useQueryString();

	const removeSelectedItem = useCallback((item: SelectItem) => {
		setSelected((prev) =>
			prev.filter((selectedItem) => selectedItem !== item),
		);
	}, []);

	const handleClick = useCallback(
		(value: string) => {
			const selectedOption = filter.options.find(
				(option) => option.value === value,
			);

			if (!selectedOption) return;

			if (selected.includes(selectedOption)) {
				setSelected((prev) =>
					prev.filter(
						(selectedItem) => selectedItem !== selectedOption,
					),
				);
			} else {
				setSelected((prev) => [...prev, selectedOption]);
			}
		},
		[filter.options, selected],
	);

	const applyFilter = useCallback(() => {
		updateQuery({
			...query,
			[filter.filterName]: selected.map((item) => item.value).join(","),
		});
	}, [filter.filterName, query, selected, updateQuery]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost">{filter.label}</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-52">
				<Flex isColumn gap="2" className="h-64">
					{selected.length > 0 && (
						<>
							<Flex gap="2" isWrapped className="max-h-16 h-8">
								{selected.map((item) => (
									<Badge
										onClick={() => removeSelectedItem(item)}
										variant="default"
										className="w-fit px-2 py-1 cursor-pointer whitespace-nowrap"
									>
										{item.label}
									</Badge>
								))}
							</Flex>
							<hr />
						</>
					)}
					<Flex
						isColumn
						className="p-2 max-h-52 overflow-y-scroll"
						gap="2"
					>
						{filter.options.map((option) => (
							<Flex
								gap="2"
								align="center"
								onClick={() =>
									handleClick(option.value.toString())
								}
								className="cursor-pointer p-1 w-full"
							>
								<Checkbox
									key={option.value}
									id={option.value.toString()}
									value={option.value}
									checked={selected.includes(option)}
								/>
								<Label.Thin200
									htmlFor={option.value.toString()}
								>
									{option.label}
								</Label.Thin200>
							</Flex>
						))}
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
