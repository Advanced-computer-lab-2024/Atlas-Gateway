
import { Card } from "@/components/ui/card";
import Label from "../components/ui/Label";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Flex } from "../components/ui/flex";
import Navbar from "../layout/Navbar";


export default function TouristProfile() { 

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
							<Label.Big700>{form.getValues().name || "John Doe"}</Label.Big700>
							<Label.Big400>{form.getValues().email || "joedoe123@gmail.com"}</Label.Big400>
							<Label.Big400>{form.getValues().username || "joedoe123"}</Label.Big400>
							<hr className="border-black" />
							<Label.Big400>
								Mobile Number: {form.getValues().mobileNumber || -1}
							</Label.Big400>

							<Label.Big400 >
								Wallet Balance: {form.getValues().walletBalance}{" "}
								L.E
							</Label.Big400>
						</Flex>
					</Flex>
                </Card>

                <TouristSheet/>
			</div>
		</div>
	);
}
