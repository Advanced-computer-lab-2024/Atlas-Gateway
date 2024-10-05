import { useTourGuideProfile } from "@/api/data/useProfile";
import Label from "../components/ui/Label";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Card } from "../components/ui/card";
import { Flex } from "../components/ui/flex";
import Navbar from "../layout/Navbar";
import TourGuideSheet from "./TourGuideSheet";



export default function TourGuideProfile() {
	const {data} = useTourGuideProfile();
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
			<div className="grid grid-cols- place-items-center items-center place-content-center w-full h-full space-y-7">
				<Card className="w-[900px] p-4 border-black">
					<Flex className="space-x-10">
						<Flex isColumn>
							<Avatar className="w-48 h-48 space-y-7">
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</Flex>
						<Flex isColumn>
							<Label.Big700>{data?.name || "Joe Doe"}</Label.Big700>
							<Label.Big400>{data?.email || "joedoe123@gmail.com"}</Label.Big400>
							<Label.Big400>{data?.username || "joedoe123"}</Label.Big400>
							<hr className="border-black" />
							<Label.Big400>
								Mobile Number: {data?.mobileNumber || "0100200003"}
							</Label.Big400>

							<Label.Big400 >
								Years of Experience: {data?.yearsOfExperience || 0}{" "}
								years
							</Label.Big400>
							<br></br>
							<Label.Big400 >
								<u>Previous Work:</u>
								<br/>
								{data?.previousWork || "This is previous experience"}
							</Label.Big400>
						</Flex>
					</Flex>
				</Card>
				<TourGuideSheet/>

				
			</div>
		</div>
	);
}
