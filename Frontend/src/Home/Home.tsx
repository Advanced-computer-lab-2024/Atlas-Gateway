import Label from "@/components/ui/Label";
import { Flex } from "@/components/ui/flex";
import { useLoginStore } from "@/store/loginStore";
import { EAccountType } from "@/types/enums";

import background from "../assets/background.png";
import HomeCard from "./HomeCard";
import { cardsMap } from "./cardData";

export default function Home() {
	const { user } = useLoginStore();

	const cards = cardsMap[(user?.type ?? EAccountType.Guest) as EAccountType];

	return (
		<Flex
			className="w-screen h-screen p-4"
			style={{
				backgroundImage: `url(${background})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
			isColumn
			align="center"
			gap="16"
		>
			<Flex isColumn gap="8">
				<Label.Big700 className="font-[pacifico] select-none">
					Atlas Gateway
				</Label.Big700>
				<Label.Big700 className="select-none">
					A trip planner that plans your trip for you.
				</Label.Big700>
			</Flex>
			<Flex
				isColumn
				gap="4"
				className="bg-white p-6 rounded-2xl border border-solid w-[50%] shadow-2xl opacity-80"
			>
				<Label.Mid700 className="select-none">
					Welcome {user?.username}
				</Label.Mid700>
				<Label.Mid700 className="select-none">
					Where would you like to go today?
				</Label.Mid700>
			</Flex>
			<Flex gap="4" isWrapped>
				{cards.map((card) => (
					<HomeCard key={card.title} {...card} />
				))}
			</Flex>
		</Flex>
	);
}
