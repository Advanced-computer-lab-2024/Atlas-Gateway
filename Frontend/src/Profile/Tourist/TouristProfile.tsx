import { Camera } from "lucide-react";

import { useTouristProfile } from "@/api/data/useProfile";
import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import profile_background from "../../assets/profile_background.jpg";
import TouristBadge from "./TouristBadge";
import Account from "./tabs/Account";
import TouristActivities from "./tabs/Activities/TouristActivities";
import BookmarkedEvents from "./tabs/Bookmarked/BookmarkedEvents";
import Complaints from "./tabs/Complaints";
import History from "./tabs/Past/History";
import TouristFlights from "./tabs/Transporations/TouristFlights";
import TouristHotels from "./tabs/Transporations/TouristHotels";
import TouristTransportations from "./tabs/Transporations/TouristTransporations";
import Transportations from "./tabs/Transporations/Transportations";
import Upcoming from "./tabs/Upcoming/Upcoming";

export default function TouristProfile() {
	const { data } = useTouristProfile();

	return (
		<Flex isColumn className="w-full">
			<div className="relative w-full">
				<div
					className="w-full h-64 bg-cover bg-center rounded-lg"
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
			<Tabs defaultValue="account" className="w-full">
				<Flex isColumn gap="5">
					<Flex className="ml-96 mt-2">
						<TabsList className="grid w-full grid-cols-6 border-2 border-black">
							<TabsTrigger value="account">
								Account Details
							</TabsTrigger>
							<TabsTrigger value="transportations">
								Transporations & Hotels
							</TabsTrigger>
							<TabsTrigger value="upcoming">
								Upcoming Bookings
							</TabsTrigger>
							<TabsTrigger value="history">
								Bookings history
							</TabsTrigger>
							<TabsTrigger value="complaints">
								Complaints
							</TabsTrigger>
							<TabsTrigger value="bookmarked">
								Bookmarked
							</TabsTrigger>
						</TabsList>
					</Flex>
					<Flex
						isColumn
						className="px-4 w-full border border-black p-3 rounded-lg min-h-[500px]"
					>
						<TabsContent value="account">
							<Account />
						</TabsContent>
						<TabsContent value="transportations">
							<Transportations />
						</TabsContent>
						<TabsContent value="upcoming">
							<Upcoming />
						</TabsContent>
						<TabsContent value="history">
							<History />
						</TabsContent>
						<TabsContent value="complaints">
							<Complaints />
						</TabsContent>
						<TabsContent value="bookmarked">
							<BookmarkedEvents />
						</TabsContent>
					</Flex>
				</Flex>
			</Tabs>
		</Flex>
	);
}
