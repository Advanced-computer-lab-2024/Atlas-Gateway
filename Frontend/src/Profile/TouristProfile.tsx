import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Camera, EllipsisVertical } from "lucide-react";

import { useTouristProfile } from "@/api/data/useProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import profile_background from "../assets/profile_background.jpg";
import TouristSheet from "./TouristSheet";

export default function TouristProfile() {
	const { data } = useTouristProfile();

	return (
		<div>
			<div className="relative w-full">
				<div
					className="w-full h-48 md:h-64 bg-cover bg-center"
					style={{
						backgroundImage: `url(${profile_background})`,
					}}
				>
					<button className="flex absolute bottom-4 right-4 mr-7 bg-orange-500 text-white px-4 py-1 rounded-lg hover:bg-orange-600">
						<Camera />
						<h2 className="ml-2">Upload Cover Photo</h2>
					</button>
				</div>

				<div className="absolute left-36 -bottom-16 w-48 h-48 rounded-full overflow-hidden border-4 border-white">
					<img
						src={profile_background}
						alt="Profile"
						className="object-cover w-full h-full"
					/>
				</div>
			</div>

			<div className="flex justify-between ml-96 mt-8 pr-10">
				<div>
					<h1 className="text-xl">
						{data?.name || "Name not found"}
					</h1>
					<h2 className="text-2xl">
						#{data?.username || "username not found"}
					</h2>
					<div className="flex gap-7">
						<h2 className="text-2xl">
							{data?.wallet || "wallet not found"}
							{data?.currency || " Currency not found"}
						</h2>
						<h2 className="text-2xl text-yellow-400">
							{data?.loyaltyPoints || "loyaltyPoints not found"}
						</h2>
					</div>
				</div>
				<div className="mr-7">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<EllipsisVertical className="cursor-pointer" />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>dummy</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<div className="flex ml-10 mr-10 mt-10">
				<Tabs defaultValue="account" className="w-full">
					<TabsList className="grid w-full grid-cols-4">
						<TabsTrigger value="account">Account</TabsTrigger>
						<TabsTrigger value="password">Password</TabsTrigger>
						<TabsTrigger value="upcoming">Upcoming</TabsTrigger>
						<TabsTrigger value="history">History</TabsTrigger>
					</TabsList>
					<TabsContent
						className="flex justify-between items-center"
						value="account"
					>
						<div>
							<h2 className="text-xl">
								{data?.email || "Email not found"}
							</h2>
							<h3 className="text-xl">
								{data?.mobile || "Mobile not found"}
							</h3>
							<h3 className="text-xl">
								Address: {data?.address || "Address here"}
							</h3>
						</div>
						<TouristSheet />
					</TabsContent>
					<TabsContent value="password"></TabsContent>
					<TabsContent value="Upcoming"></TabsContent>
					<TabsContent value="History"></TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
