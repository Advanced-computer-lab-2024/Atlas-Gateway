import { useTourGuideProfile } from "@/api/data/useProfile";

import Label from "../components/ui/Label";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Card } from "../components/ui/card";
import { Flex } from "../components/ui/flex";
import TourGuideSheet from "./TourGuideSheet";

export default function TourGuideProfile() {
	const { data } = useTourGuideProfile();

	return (
		<div className="grid grid-cols- place-items-center items-center place-content-center w-full h-full space-y-7">
			<Card className="w-[900px] min-h-[400px] p-4 border-black">
				<Flex gap="5">
					<Flex isColumn>
						<Avatar className="w-48 h-48 space-y-7">
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</Flex>
					<Flex isColumn gap="4">
						<Flex isColumn gap="2">
							<Label.Big700>{data?.username}</Label.Big700>
							<Label.Big400>{data?.email || "N/A"}</Label.Big400>
						</Flex>
						<hr className="border-black" />
						<Flex isColumn gap="2">
							<Flex gap="2">
								<Label.Big400>Mobile Number:</Label.Big400>
								<Label.Thin400>
									{data?.mobileNumber || "N/A"}
								</Label.Thin400>
							</Flex>
							<Flex gap="2">
								<Label.Big400>
									Years of Experience:
								</Label.Big400>
								<Label.Thin400>
									{data?.yearsOfExperience || 0} years
								</Label.Thin400>
							</Flex>
						</Flex>
						<Flex isColumn gap="2">
							<Label.Big400>Previous Work:</Label.Big400>
							<Label.Mid400>{data?.previousWork}</Label.Mid400>
						</Flex>
					</Flex>
				</Flex>
			</Card>
			<TourGuideSheet />
		</div>
	);
}
