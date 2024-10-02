import { useEffect, useState } from "react";
import Label from "../components/ui/Label";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Flex } from "../components/ui/flex";
import { Input } from "../components/ui/input";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import Navbar from "../layout/Navbar";


interface User {
	companyName: string;
	email: string;
	username: string;
	description: string;
	profilePicture: string | null;
}

export default function SellerProfile() {
	const [user, setUser] = useState<User | null>(null);
	const [formData, setFormData] = useState<User>({
		companyName: "",
		email: "",
		username: "",
		description: "",
		profilePicture: null,
	});

	// Dummy user data for testing
	useEffect(() => {
		const dummyUser: User = {
			companyName: "John Doe",
			email: "john.doe@example.com",
			username: "johndoe123",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget turpis nec purus lacinia ultricies. Etiam ut nunc nec nunc ultricies malesuada. Sed nec felis ut odio ultricies tempus. Nullam ut nunc nec nunc ultricies malesuada. Sed nec felis ut odio ultricies tempus.",
			profilePicture:
				"https://wallpapers.com/images/high/funny-profile-picture-r8l2gifvpdd0kt25.webp",
		};
		setUser(dummyUser);
		setFormData(dummyUser); // Initialize form data with dummy user data
	}, []);

	const handleUpdateProfile = () => {
		// Update the user state with the new form data
		setUser(formData);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { id, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[id]: value,
		}));
	};

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
								{user?.companyName}
							</Label.Big700>
							<Label.Big400>
								{user?.email}
							</Label.Big400>
							<Label.Big400>
								{user?.username}
							</Label.Big400>
							<hr className="border-black"/>
							
							<br></br>
							<Label.Big400>
								{user?.description}
							</Label.Big400>
						</Flex>
					</Flex>
				</Card>

				<div>
					<Sheet>
						<SheetTrigger asChild>
							<Button className="align p-6 justify-center"><Label.Big400>Update Profile</Label.Big400></Button>
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle><Label.Big600>Edit profile</Label.Big600></SheetTitle>
								<SheetDescription>
									Make changes to your profile here. Click
									save when you're done.
								</SheetDescription>
							</SheetHeader>
							<div className="grid grid-cols gap-4 py-4">
								{/* Name input */}
								<div className="flex-1 items-center gap-4">
									<Label.Big300
										className="text-left"
									>
										Company Name:-
									</Label.Big300>
									<Input
										id="companyName"
										value={formData.companyName}
										onChange={handleInputChange}
										className="col-span-3 border-black"
									/>
								</div>

								{/* Email input */}
								<div className="flex-1 grid-cols-4 items-center gap-4">
									<Label.Big300
										className="text-left"
									>
										Email:-
									</Label.Big300>
									<Input
										id="email"
										value={formData.email}
										onChange={handleInputChange}
										className="col-span-3 border-black"
									/>
								</div>

								{/* Description input */}
								<div className="flex-1 items-center gap-4 ">
									<Label.Big300
										className="text-left"
									>
										Description:-
									</Label.Big300>
								
									<textarea
										id="description"
										value={formData.description}
										onChange={handleInputChange}
										className="bg-white col-span-3 border-2 border-black h-40 w-[340px] resize"
										/>
									
								</div>
			
							</div>
							<SheetFooter>
								<SheetClose asChild>
									<Button
										type="submit"
										onClick={handleUpdateProfile}
									>
										Save changes
									</Button>
								</SheetClose>
							</SheetFooter>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</div>
	);
}