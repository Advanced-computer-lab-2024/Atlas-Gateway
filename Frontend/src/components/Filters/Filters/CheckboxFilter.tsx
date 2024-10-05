import { useCallback, useState } from "react";

import Label from "@/components/ui/Label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Flex } from "@/components/ui/flex";
import { Input } from "@/components/ui/input";

import { SelectItem, TCheckboxFilter } from "../types";
import { Button } from "@/components/ui/button";

export default function CheckboxFilter({
	filter,
}: {
	filter: TCheckboxFilter;
}) {
	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState<SelectItem[]>([]);

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

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost">{filter.label}</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-52">
				<Flex isColumn gap="2">
					<Input
						placeholder="Search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					{selected.length > 0 && (
						<>
							<Flex
								gap="2"
								isWrapped
								className="max-h-16 overflow-y-scroll"
							>
								{selected.map((item) => (
									<Badge
										onClick={() => removeSelectedItem(item)}
										variant="default"
										className="w-fit px-2 py-1 cursor-pointer"
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
				</Flex>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
