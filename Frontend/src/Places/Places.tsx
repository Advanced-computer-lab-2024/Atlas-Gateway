import { Search } from "lucide-react";

import { usePlaces } from "@/api/data/usePlaces";
import Filters from "@/components/Filters/Filters";
import Label from "@/components/ui/Label";
import { Flex } from "@/components/ui/flex";
import { Input } from "@/components/ui/input";
import { TPlace } from "@/types/global";

import PlaceCard from "./PlaceCard";

export default function Places() {
	const { data } = usePlaces();

	const places: TPlace[] = [
		{
			id: "0",
			name: "place 1",
			description: "place 1 description",
			images: [],
			location: "place 1 location",
			rating: 1,
			categories: ["aaa", "aaaa", "aaa", "aaaa", "aaa", "aaaa"],
			tags: ["aaa", "aaaa"],
			openingHours: {
				friday: {
					open: "10:00",
					close: "18:00",
				},
				monday: {
					open: "10:00",
					close: "18:00",
				},
				saturday: {
					open: "10:00",
					close: "18:00",
				},
				sunday: {
					open: "10:00",
					close: "18:00",
				},
				thursday: {
					open: "10:00",
					close: "18:00",
				},
				tuesday: {
					open: "10:00",
					close: "18:00",
				},
				wednesday: {
					open: "10:00",
					close: "18:00",
				},
			},
		},
		{
			id: "1",
			name: "place 1",
			description: "place 1 description",
			images: [],
			location: "place 1 location",
			rating: 1,
			categories: [],
			tags: [],
			openingHours: {
				friday: {
					open: "10:00",
					close: "18:00",
				},
				monday: {
					open: "10:00",
					close: "18:00",
				},
				saturday: {
					open: "10:00",
					close: "18:00",
				},
				sunday: {
					open: "10:00",
					close: "18:00",
				},
				thursday: {
					open: "10:00",
					close: "18:00",
				},
				tuesday: {
					open: "10:00",
					close: "18:00",
				},
				wednesday: {
					open: "10:00",
					close: "18:00",
				},
			},
		},
		{
			id: "2",
			name: "place 1",
			description: "place 1 description",
			images: [],
			location: "place 1 location",
			rating: 1,
			categories: [],
			tags: [],
			openingHours: {
				friday: {
					open: "10:00",
					close: "18:00",
				},
				monday: {
					open: "10:00",
					close: "18:00",
				},
				saturday: {
					open: "10:00",
					close: "18:00",
				},
				sunday: {
					open: "10:00",
					close: "18:00",
				},
				thursday: {
					open: "10:00",
					close: "18:00",
				},
				tuesday: {
					open: "10:00",
					close: "18:00",
				},
				wednesday: {
					open: "10:00",
					close: "18:00",
				},
			},
		},
		{
			id: "2",
			name: "place 1",
			description: "place 1 description",
			images: [],
			location: "place 1 location",
			rating: 1,
			categories: [],
			tags: [],
			openingHours: {
				friday: {
					open: "10:00",
					close: "18:00",
				},
				monday: {
					open: "10:00",
					close: "18:00",
				},
				saturday: {
					open: "10:00",
					close: "18:00",
				},
				sunday: {
					open: "10:00",
					close: "18:00",
				},
				thursday: {
					open: "10:00",
					close: "18:00",
				},
				tuesday: {
					open: "10:00",
					close: "18:00",
				},
				wednesday: {
					open: "10:00",
					close: "18:00",
				},
			},
		},
		{
			id: "2",
			name: "place 1",
			description: "place 1 description",
			images: [],
			location: "place 1 location",
			rating: 1,
			categories: [],
			tags: [],
			openingHours: {
				friday: {
					open: "10:00",
					close: "18:00",
				},
				monday: {
					open: "10:00",
					close: "18:00",
				},
				saturday: {
					open: "10:00",
					close: "18:00",
				},
				sunday: {
					open: "10:00",
					close: "18:00",
				},
				thursday: {
					open: "10:00",
					close: "18:00",
				},
				tuesday: {
					open: "10:00",
					close: "18:00",
				},
				wednesday: {
					open: "10:00",
					close: "18:00",
				},
			},
		},
		{
			id: "2",
			name: "place 1",
			description: "place 1 description",
			images: [],
			location: "place 1 location",
			rating: 1,
			categories: [],
			tags: [],
			openingHours: {
				friday: {
					open: "10:00",
					close: "18:00",
				},
				monday: {
					open: "10:00",
					close: "18:00",
				},
				saturday: {
					open: "10:00",
					close: "18:00",
				},
				sunday: {
					open: "10:00",
					close: "18:00",
				},
				thursday: {
					open: "10:00",
					close: "18:00",
				},
				tuesday: {
					open: "10:00",
					close: "18:00",
				},
				wednesday: {
					open: "10:00",
					close: "18:00",
				},
			},
		},
		{
			id: "2",
			name: "place 1",
			description: "place 1 description",
			images: [],
			location: "place 1 location",
			rating: 1,
			categories: [],
			tags: [],
			openingHours: {
				friday: {
					open: "10:00",
					close: "18:00",
				},
				monday: {
					open: "10:00",
					close: "18:00",
				},
				saturday: {
					open: "10:00",
					close: "18:00",
				},
				sunday: {
					open: "10:00",
					close: "18:00",
				},
				thursday: {
					open: "10:00",
					close: "18:00",
				},
				tuesday: {
					open: "10:00",
					close: "18:00",
				},
				wednesday: {
					open: "10:00",
					close: "18:00",
				},
			},
		},
		{
			id: "2",
			name: "place 1",
			description: "place 1 description",
			images: [],
			location: "place 1 location",
			rating: 1,
			categories: [],
			tags: [],
			openingHours: {
				friday: {
					open: "10:00",
					close: "18:00",
				},
				monday: {
					open: "10:00",
					close: "18:00",
				},
				saturday: {
					open: "10:00",
					close: "18:00",
				},
				sunday: {
					open: "10:00",
					close: "18:00",
				},
				thursday: {
					open: "10:00",
					close: "18:00",
				},
				tuesday: {
					open: "10:00",
					close: "18:00",
				},
				wednesday: {
					open: "10:00",
					close: "18:00",
				},
			},
		},
		{
			id: "2",
			name: "place 1",
			description: "place 1 description",
			images: [],
			location: "place 1 location",
			rating: 1,
			categories: [],
			tags: [],
			openingHours: {
				friday: {
					open: "10:00",
					close: "18:00",
				},
				monday: {
					open: "10:00",
					close: "18:00",
				},
				saturday: {
					open: "10:00",
					close: "18:00",
				},
				sunday: {
					open: "10:00",
					close: "18:00",
				},
				thursday: {
					open: "10:00",
					close: "18:00",
				},
				tuesday: {
					open: "10:00",
					close: "18:00",
				},
				wednesday: {
					open: "10:00",
					close: "18:00",
				},
			},
		},
	];

	return (
		<Flex
			isColumn
			gap="4"
			className="w-full h-full px-10 py-8 overflow-y-scroll"
		>
			<Label.Big600>View a list of museums and historical locations you can visit!</Label.Big600>
			<Flex
				justify="center"
				isColumn
				gap="2"
				className="bg-surface-secondary p-2 rounded-lg"
			>
				<Flex>
					<Flex gap="1" align="center" className="relative">
						<Search className="absolute left-1" />
						<Input
							placeholder="Search..."
							className="w-48 bg-white pl-8"
						/>
						<Filters
							filters={{
								tags: {
									filterName: "tags",
									label: "Tags",
									type: "checkbox",
									options: [],
								},
								categories: {
									filterName: "categories",
									label: "Categories",
									type: "checkbox",
									options: [],
								},
								rating: {
									filterName: "rating",
									label: "Rating",
									type: "range",
								},
							}}
						/>
					</Flex>
				</Flex>
			</Flex>
			<Flex
				className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
				gap="4"
			>
				{places?.map((place) => <PlaceCard {...place} />)}
			</Flex>
		</Flex>
	);
}
