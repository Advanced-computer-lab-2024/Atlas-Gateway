import Label from "@/components/ui/Label";
import { Flex } from "@/components/ui/flex";

export default function TouristBadge({ level }: { level: 1 | 2 | 3 }) {
	switch (level) {
		case 3:
			return (
				<Flex
					align="center"
					justify="center"
					className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-white w-14 h-14 rounded-full border-2 border-yellow-300 shadow-lg"
				>
					<Label.Big200>Gold</Label.Big200>
				</Flex>
			);
		case 2:
			return (
				<Flex
					align="center"
					justify="center"
					className="bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 text-white w-14 h-14 rounded-full border-2 border-gray-300 shadow-lg"
				>
					<Label.Big200>Silver</Label.Big200>
				</Flex>
			);
		case 1:
			return (
				<Flex
					align="center"
					justify="center"
					className="bg-gradient-to-br from-yellow-700 via-yellow-800 to-yellow-900 text-white w-14 h-14 rounded-full border-2 border-yellow-500 shadow-lg"
				>
					<Label.Big200>Bronze</Label.Big200>
				</Flex>
			);
	}
}
