import { formatDate } from "date-fns";

import Label from "@/components/ui/Label";
import { Flex } from "@/components/ui/flex";
import Rating, { ERatingType } from "@/components/ui/rating";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { TItinerary } from "@/types/global";

export default function ItinieraryDetailsSheet({
	open,
	setOpen,
	itinerary,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
	itinerary: TItinerary;
}) {
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Itinerary Details</SheetTitle>
					<SheetDescription>{itinerary.title}</SheetDescription>
				</SheetHeader>
				<Flex isColumn gap="4">
					<Flex isColumn gap="2" align="start">
						<Label.Thin300>Language</Label.Thin300>
						<Label.Mid500>{itinerary.language}</Label.Mid500>
					</Flex>
					<Flex isColumn gap="2" align="start">
						<Label.Thin300>Availability</Label.Thin300>
						<Label.Mid500>{itinerary.availability}</Label.Mid500>
					</Flex>
					<Flex isColumn gap="2" align="start">
						<Label.Thin300>Rating</Label.Thin300>
						<Rating
							value={itinerary.avgRating}
							ratingType={ERatingType.DETAILS}
						/>
					</Flex>
					<Flex isColumn gap="2" align="start">
						<Label.Thin300>Start Date</Label.Thin300>
						<Label.Mid500>
							{formatDate(
								new Date(itinerary.startDateTime || "0"),
								"dd/MM/yyyy HH:mm:ss a",
							)}
						</Label.Mid500>
					</Flex>
					<Flex isColumn gap="2" align="start">
						<Label.Thin300>Ebd Date</Label.Thin300>
						<Label.Mid500>
							{formatDate(
								new Date(itinerary.endDateTime || "0"),
								"dd/MM/yyyy HH:mm:ss a",
							)}
						</Label.Mid500>
					</Flex>
					<Flex isColumn gap="2" align="start">
						<Label.Thin300>Number of bookings</Label.Thin300>
						<Label.Mid500>
							{itinerary.numberOfBookings}
						</Label.Mid500>
					</Flex>
					<Flex isColumn gap="2" align="start">
						<Label.Thin300>Pickup location</Label.Thin300>
						<Label.Mid500>{itinerary.pickUpLocation}</Label.Mid500>
					</Flex>
					<Flex isColumn gap="2" align="start">
						<Label.Thin300>Timeline</Label.Thin300>
						<Label.Mid500>{itinerary.timeline}</Label.Mid500>
					</Flex>
				</Flex>
			</SheetContent>
		</Sheet>
	);
}