import { useSellerProfile } from "@/api/data/useProfile";

import Label from "../components/ui/Label";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Card } from "../components/ui/card";
import { Flex } from "../components/ui/flex";
import SellerSheet from "./SellerSheet";

export default function SellerProfile() {
	const { data } = useSellerProfile();

	//May needed later:

	// // Function to truncate description for display
	// const truncateDescription = (text: string, maxLength: number) => {
	// 	if (text.length > maxLength) {
	// 		return text.slice(0, maxLength) + "...";
	// 	}
	// 	return text;
	// };

	return (
		<div className="grid  place-items-center items-center place-content-center w-full h-full space-y-7">
			<Card className="w-[900px] p-4 border-black">
				<Flex className="space-x-10">
					<Flex isColumn>
						<Avatar className="w-48 h-48 space-y-7">
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</Flex>
					<Flex isColumn>
						<Label.Big700>
							{data?.username || "joedoe123"}
						</Label.Big700>
						<Label.Big400>
							{data?.name || "joedoe123"}
						</Label.Big400>
						<Label.Big400>
							{data?.companyName || "Joe Doe Seller"}
						</Label.Big400>
						<Label.Big400>
							{data?.email || "joedoe123@gmail.com"}
						</Label.Big400>
						<hr className="border-black" />
						<br></br>
						<Label.Big400>
							{data?.description || "This is a description"}
						</Label.Big400>
					</Flex>
				</Flex>
			</Card>
			<SellerSheet />
		</div>
	);
}
