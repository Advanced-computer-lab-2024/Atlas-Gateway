import { useTouristProfile } from "@/api/data/useProfile";
import { Card } from "@/components/ui/card";

import Label from "../components/ui/Label";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Flex } from "../components/ui/flex";
import TouristSheet from "./TouristSheet";

export default function TouristProfile() {
	const { data } = useTouristProfile();

	return (
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
						<Label.Big700>
							{data?.username || "Username not found"}
						</Label.Big700>
						<Label.Big400>{data?.name || "Name not found"}</Label.Big400>
						<Label.Big400>
							{data?.email || "Email not found"}
						</Label.Big400>
						<hr className="border-black" />
						<Label.Big400>
							Mobile Number: {data?.mobile || -1}
						</Label.Big400>

						<Label.Big400>
							Wallet Balance: {data?.walletBalance} L.E
						</Label.Big400>
					</Flex>
				</Flex>
			</Card>

			<TouristSheet />
		</div>
	);
}
