import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import UpcomingActivities from "./UpcomingActivities";
import UpcomingItineraries from "./UpcomingItineraries";

function Upcoming() {
	return (
		<Tabs defaultValue="UpcomingActivities" className="w-full">
			<TabsList className="grid w-full grid-cols-2 border-2 border-black">
				<TabsTrigger value="UpcomingActivities">Activities</TabsTrigger>
				<TabsTrigger value="UpcomingItineraries">
					Itineraries
				</TabsTrigger>
			</TabsList>
			<TabsContent value="UpcomingActivities">
				<UpcomingActivities />
			</TabsContent>
			<TabsContent value="UpcomingItineraries">
				<UpcomingItineraries />
			</TabsContent>
		</Tabs>
	);
}

export default Upcoming;
