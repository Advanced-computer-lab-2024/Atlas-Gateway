import { set } from "lodash";
import { TrashIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { useQueryString } from "@/api/data/useQueryString";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Flex } from "@/components/ui/flex";

import Label from "../ui/Label";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import FilterDropdown from "./FilterDropdown";
import { TFilter, TFilters } from "./types";

export default function Filters({ filters }: { filters: TFilters }) {
	const [isOpen, setIsOpen] = useState(false);
	const [activeFilters, setActiveFilters] = useState<TFilter[]>([]);
	const [query, updateQuery] = useQueryString();

	const filterOptions = useMemo(
		() =>
			Object.entries<TFilter>(filters).map(([, filter]) => {
				const checked = activeFilters.includes(filter);
				return {
					value: filter.filterName,
					label: filter.label,
					checked,
				};
			}),
		[activeFilters, filters],
	);

	const clearSelection = () => {
		const newQuery = { ...query, page: 1 };
		activeFilters.forEach((filter) => {
			set(newQuery, filter.filterName, undefined);
		});
		setActiveFilters([]);
		updateQuery(newQuery);
	};

	const handleClick = useCallback(
		(filterName: string, checked: boolean) => {
			const filter = Object.entries<TFilter>(filters).filter(
				([, filter]) => filter.filterName === filterName,
			)[0][1];
			if (!filter) return;

			if (checked) {
				setActiveFilters((prev) =>
					prev.filter((f) => f.filterName !== filter.filterName),
				);
			} else {
				setActiveFilters((prev) => [...prev, filter]);
				setIsOpen(false);
			}
		},
		[filters],
	);

	return (
		<Flex gap="2" align="center">
			<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
				<DropdownMenuTrigger asChild>
					<Button>Add filters</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<Flex isColumn className="p-2" gap="2">
						{filterOptions.map((option) => (
							<Flex
								gap="2"
								align="center"
								onClick={() =>
									handleClick(option.value, option.checked)
								}
								className="cursor-pointer w-full  h-full"
							>
								<Checkbox
									id={option.value.toString()}
									key={option.value}
									value={option.value}
									checked={option.checked}
								/>
								<Label.Thin200
									htmlFor={option.value.toString()}
								>
									{option.label}
								</Label.Thin200>
							</Flex>
						))}
					</Flex>
				</DropdownMenuContent>
			</DropdownMenu>
			{activeFilters.length > 0 && (
				<TrashIcon
					className="cursor-pointer"
					onClick={clearSelection}
				/>
			)}
			{activeFilters.map((filter) => (
				<FilterDropdown
					filter={filter}
					setActiveFilters={setActiveFilters}
				/>
			))}
		</Flex>
	);
}
