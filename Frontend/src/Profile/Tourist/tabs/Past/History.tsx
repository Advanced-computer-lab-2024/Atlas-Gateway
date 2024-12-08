import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PastActivities from './PastActivities';
import PastItineraries from './PastItineraries';
function History() {
  return (
    <div className="flex ml-10 mr-10">
				<Tabs defaultValue="pastActivities" className="w-full">
					<TabsList className="grid w-full grid-cols-2 border-2 border-black">
						<TabsTrigger value="pastActivities"> Activities</TabsTrigger>
						<TabsTrigger value="pastItineraries"> Itineraries</TabsTrigger>
					</TabsList>
					<TabsContent value="pastActivities">
						<PastActivities/>
					</TabsContent>
                    <TabsContent value="pastItineraries">
						<PastItineraries/>
					</TabsContent>
				</Tabs>
			</div>
  )
}

export default History
