import { useState } from "react";

import Label from "@/components/ui/Label";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Flex } from "@/components/ui/flex";
import { Input } from "@/components/ui/input";

import { TRangeFilter } from "../types";
import { Button } from "@/components/ui/button";

export default function RangeFilter({ filter }: { filter: TRangeFilter }) {
	const [start, setStart] = useState("");
	const [end, setEnd] = useState("");

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
				</Flex>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
