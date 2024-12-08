import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import TouristFlights from "./TouristFlights";
import TouristHotels from "./TouristHotels";
import TouristTransportations from "./TouristTransporations";

export default function Transportations() {
	return (
		<Tabs defaultValue="Flights" className="w-full">
			<TabsList className="grid w-full grid-cols-3 border-2 border-black">
				<TabsTrigger value="Flights">Flights</TabsTrigger>
				<TabsTrigger value="Hotels">Hotels</TabsTrigger>
				<TabsTrigger value="Transportations">
					Transportations
				</TabsTrigger>
			</TabsList>
			<TabsContent value="Flights">
				<TouristFlights />
			</TabsContent>
			<TabsContent value="Hotels">
				<TouristHotels />
			</TabsContent>
			<TabsContent value="Transportations">
				<TouristTransportations />
			</TabsContent>
		</Tabs>
	);
}
