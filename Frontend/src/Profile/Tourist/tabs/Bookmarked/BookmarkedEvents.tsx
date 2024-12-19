import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import TouristBookedActivities from "./BookedActivities";
import TouristBookedItineraries from "./BookedItineraries";

export default function BookmarkedEvents() {
	return (
		<Tabs defaultValue="bookedActivities" className="w-full">
			<TabsList className="grid w-full grid-cols-2 border-2 border-black">
				<TabsTrigger value="bookedActivities">Activities</TabsTrigger>
				<TabsTrigger value="bookedItineraries">Itineraries</TabsTrigger>
			</TabsList>
			<TabsContent value="bookedActivities">
				<TouristBookedActivities />
			</TabsContent>
			<TabsContent value="bookedItineraries">
				<TouristBookedItineraries />
			</TabsContent>
		</Tabs>
	);
}
