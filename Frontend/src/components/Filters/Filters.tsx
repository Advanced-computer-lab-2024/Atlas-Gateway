import { TrashIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useQueryString from "use-query-string";

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
	const navigate = useNavigate();
	// @ts-expect-error - idk
	const [query, setQuery] = useQueryString(window.location, navigate);

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

	console.log(filterOptions);

	const clearSelection = () => {
		setActiveFilters([]);
		const newQuery = { ...query };
		activeFilters.forEach((filter) => {
			delete newQuery[filter.filterName];
		});
		setQuery(newQuery);
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
			<TrashIcon className="cursor-pointer" onClick={clearSelection} />
			{activeFilters.map((filter) => (
				<FilterDropdown filter={filter} />
			))}
		</Flex>
	);
}
