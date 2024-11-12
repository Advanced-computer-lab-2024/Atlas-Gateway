import Label from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";
import useCurrency from "@/hooks/useCurrency";
import { THotelOffer } from "@/types/global";

export default function BookingCard({
	offer,
	onBookOffer,
}: {
	offer: THotelOffer;
	onBookOffer: (offer: THotelOffer) => void;
}) {
	const convertCurrency = useCurrency();

	return (
		<Card>
			<CardHeader>
				<Label.Mid500>
					{offer.room.description.text.replace("\n", "")}
				</Label.Mid500>
			</CardHeader>
			<CardContent>
				<Flex isColumn gap="4">
					<Flex justify="around">
						<Flex isColumn gap="2">
							<Label.Thin300>Check in</Label.Thin300>
							<Label.Mid300>{offer.checkInDate}</Label.Mid300>
						</Flex>
						<Flex isColumn gap="2">
							<Label.Thin300>Check out</Label.Thin300>
							<Label.Mid300>{offer.checkOutDate}</Label.Mid300>
						</Flex>
						<Flex isColumn gap="2">
							<Label.Thin300>Guests</Label.Thin300>
							<Label.Mid300>{offer.guests.adults}</Label.Mid300>
						</Flex>
						<Flex isColumn gap="2">
							<Label.Thin300>Beds</Label.Thin300>
							<Label.Mid300>
								{offer.room.typeEstimated.beds}
							</Label.Mid300>
						</Flex>
						<Flex isColumn gap="2">
							<Label.Thin300>Beds type</Label.Thin300>
							<Label.Mid300>
								{offer.room.typeEstimated.bedType}
							</Label.Mid300>
						</Flex>
					</Flex>
					<Flex gap="2" align="center">
						<Label.Thin500>Price</Label.Thin500>
						<Label.Mid500>
							{convertCurrency(
								+offer.price.total,
								offer.price.currency,
							)}
						</Label.Mid500>
					</Flex>
				</Flex>
			</CardContent>
			<CardFooter>
				<Button
					variant="default"
					className="w-full"
					onClick={() => {
						onBookOffer(offer);
					}}
				>
					Book
				</Button>
			</CardFooter>
		</Card>
	);
}
