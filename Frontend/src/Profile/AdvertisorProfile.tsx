import { useAdvertisorProfile } from "@/api/data/useProfile";
import Label from "../components/ui/Label";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Card } from "../components/ui/card";
import { Flex } from "../components/ui/flex";
import Navbar from "../layout/Navbar";

export default function AdvertisorProfile() {

	const {data} = useAdvertisorProfile();

	//May needed later:

	// // Function to truncate description for display
	// const truncateDescription = (text: string, maxLength: number) => {
	// 	if (text.length > maxLength) {
	// 		return text.slice(0, maxLength) + "...";
	// 	}
	// 	return text;
	// };

	return (
		<div className="space-y-7">
			<Navbar />
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
							<Label.Big700 >
								{data?.companyName || "Joe Doe Advertisor"}
							</Label.Big700>
							<Label.Big400>
								{data?.email || "joedoe123@gmail.com"}
							</Label.Big400>
							<Label.Big400>
								{data?.username || "joedoe123"}
							</Label.Big400>
							<hr className="border-black"/>
							<Label.Big400>
								Hotline: {data?.hotline || "911"}
							</Label.Big400>

							<Label.Big400>
								Website:{" "}
								<a
									href={data?.website}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-500 underline"
								>
									{data?.website || "https://example.com"}
								</a>
							</Label.Big400>
							<br></br>
							<Label.Big400>
								{data?.description || "This is a description"}
							</Label.Big400>
						</Flex>
					</Flex>
				</Card>

				
			</div>
		</div>
	);
}