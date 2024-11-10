import { Camera, Settings, TicketCheck } from "lucide-react";
import { useState } from "react";

import {
	useRedeemTouristLoyaltyPoints,
	useRequestDeleteTouristProfile,
	useTouristProfile,
} from "@/api/data/useProfile";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Flex } from "@/components/ui/flex";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import profile_background from "../../assets/profile_background.jpg";
import ChangePasswordSheet from "../ChangePasswordSheet";
import TouristBadge from "./TouristBadge";
import TouristSheet from "./TouristSheet";
import Account from "./tabs/Account";
import TouristActivities from "./tabs/Activities/TouristActivities";
import Complaints from "./tabs/Complaints";
import TouristItineraries from "./tabs/Itineraries/TouristItineraries";
import TouristTransportations from "./tabs/Transporations/TouristTransporations";

export default function TouristProfile() {
	const { data, refetch } = useTouristProfile();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const { doRequestDeleteTouristProfile } = useRequestDeleteTouristProfile(
		() => {},
	);
	const { doRedeemTouristLoyaltyPoints } =
		useRedeemTouristLoyaltyPoints(refetch);
	return (
		<div>
			<div className="relative w-full">
				<div
					className="w-full h-48 md:h-64 bg-cover bg-center"
					style={{
						backgroundImage: `url(${profile_background})`,
					}}
				>
					<Button className="flex absolute bottom-4 right-4 mr-7 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
						<Camera />
						<h2 className="ml-2">Upload Cover Photo</h2>
					</Button>
				</div>
				<div className="absolute left-36 -bottom-16 w-48 h-48 rounded-full overflow-hidden border-4 border-white">
					<img
						src={profile_background}
						alt="Profile"
						className="object-cover w-full h-full"
					/>
				</div>
				<Flex className="absolute left-72">
					<TouristBadge level={data?.level || 1} />
				</Flex>
			</div>

			<div className="flex justify-between ml-96 mt-2 pr-10">
				<div>
					{data?.name && (
						<h1 className="text-xl">
							{data?.name || "Name not found"}
						</h1>
					)}
					<h2 className="text-2xl">{data?.username}</h2>
					<div className="flex gap-7">
						<h2 className="text-2xl">
							{data?.walletBalance} {data?.currency}
						</h2>
						<h2 className="text-2xl text-yellow-400">
							{data?.loyaltyPoints}
							{" Points"}
						</h2>
						<button
							onClick={() => {
								doRedeemTouristLoyaltyPoints(data?._id!);
							}}
						>
							<TicketCheck />
						</button>
					</div>
				</div>
				<Flex className="mr-7" gap="2" align="center">
					<TouristSheet />
					<DropdownMenu modal={false}>
						<DropdownMenuTrigger className="bg-transparent">
							<Settings className="cursor-pointer" />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem
								onClick={() => {
									setIsDrawerOpen(true);
								}}
								className="cursor-pointer"
							>
								change password
							</DropdownMenuItem>

							<DropdownMenuItem
								onClick={() => {
									if (data?._id)
										doRequestDeleteTouristProfile(data._id);
								}}
								className="cursor-pointer"
							>
								Delete Account
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</Flex>
			</div>
			<div className="flex ml-10 mr-10 mt-10">
				<Tabs defaultValue="account" className="w-full">
					<TabsList className="grid w-full grid-cols-5 border-2 border-black">
						<TabsTrigger value="account">Account</TabsTrigger>
						<TabsTrigger value="activities">Activities</TabsTrigger>
						<TabsTrigger value="itineraries">
							Itineraries
						</TabsTrigger>
						<TabsTrigger value="transporations">
							Transporations
						</TabsTrigger>
						<TabsTrigger value="complains">Complaints</TabsTrigger>
					</TabsList>
					<TabsContent value="account">
						<Account />
					</TabsContent>
					<TabsContent value="activities">
						<TouristActivities />
					</TabsContent>
					<TabsContent value="itineraries">
						<TouristItineraries />
					</TabsContent>
					<TabsContent value="transporations">
						<TouristTransportations />
					</TabsContent>
					<TabsContent value="upcoming"></TabsContent>
					<TabsContent value="history"></TabsContent>
					<TabsContent value="complains">
						<Complaints />
					</TabsContent>
				</Tabs>
			</div>
			<ChangePasswordSheet
				isDrawerOpen={isDrawerOpen}
				setIsDrawerOpen={setIsDrawerOpen}
			/>
		</div>
	);
}
