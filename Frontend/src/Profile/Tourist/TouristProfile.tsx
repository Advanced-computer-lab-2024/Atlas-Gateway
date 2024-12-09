import { useTouristProfile } from "@/api/data/useProfile";
import { Flex } from "@/components/ui/flex";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import profile_background from "../../assets/profile_background.jpg";
import TouristBadge from "./TouristBadge";
import Account from "./tabs/Account";
import BookmarkedEvents from "./tabs/Bookmarked/BookmarkedEvents";
import Complaints from "./tabs/Complaints";
import TouristOrders from "./tabs/Orders/touristOrders";
import History from "./tabs/Past/History";
import Transportations from "./tabs/Transporations/Transportations";
import Upcoming from "./tabs/Upcoming/Upcoming";

export default function TouristProfile() {
	const { data } = useTouristProfile();

	return (
		<Flex isColumn className="w-full pt-6">
			<div className="relative w-full">
				<div
					className="w-full h-64 bg-cover bg-center rounded-lg"
					style={{
						backgroundImage: `url(${profile_background})`,
					}}
				/>
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
						<TabsList className="grid w-full grid-cols-7 border-2 border-black">
							<TabsTrigger value="account">
								Account Details
							</TabsTrigger>
							<TabsTrigger value="transportations">
								Transportations & Hotels
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
							<TabsTrigger value="Orders">Orders</TabsTrigger>
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
						<TabsContent value="Orders">
							<TouristOrders />
						</TabsContent>
					</Flex>
				</Flex>
			</Tabs>
		</Flex>
	);
}
