import { Search } from "lucide-react";

import { useProducts } from "@/api/data/useProducts";
import Filters from "@/components/Filters/Filters";
import Label from "@/components/ui/Label";
import { Flex } from "@/components/ui/flex";
import { Input } from "@/components/ui/input";
import { TProduct } from "@/types/global";

import ProductCard from "./ProductCard";

export default function Products() {
	const { data } = useProducts();

	const product: TProduct[] = [
		{
			id: "0",
			name: "place 1",
			description: "place 1 description",
			images: [],
			price: 1,
			rating: 1,
			reviews: [],
			seller: {
				id: "0",
				username: "seller",
				type: "seller",
			},
		},
	];

	return (
		<Flex
			isColumn
			gap="4"
			className="w-full h-full px-10 py-8 overflow-y-scroll"
		>
			<Label.Big600>View a list of products you can buy!</Label.Big600>
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
				{product?.map((product) => <ProductCard {...product} />)}
			</Flex>
		</Flex>
	);
}
