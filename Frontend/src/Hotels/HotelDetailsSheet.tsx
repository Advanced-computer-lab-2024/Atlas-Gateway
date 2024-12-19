import {
	useBookhotel,
	useHotelOffers,
	useHotelRatings,
} from "@/api/data/useHotels";
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
import { useLoginStore } from "@/store/loginStore";
import { THotel, THotelOffer } from "@/types/global";

import BookingCard from "./BookingCard";

export default function HotelDetailsSheet({
	open,
	hotel,
	cityCode,
	handleClose,
}: {
	open: boolean;
	hotel: THotel | null;
	cityCode: string;
	handleClose: () => void;
}) {
	const { user } = useLoginStore();
	const { data: offers } = useHotelOffers(hotel?.hotelId || null);
	const { data: rating } = useHotelRatings(hotel?.hotelId || null);

	const { doBookHotel } = useBookhotel(() => {});

	const onBookOffer = (offer: THotelOffer) => {
		doBookHotel({
			touristID: user?._id || "",
			hotel: {
				hotelId: hotel?.hotelId || "",
				chainCode: hotel?.chainCode || "",
				cityCode: cityCode || "",
				name: hotel?.name || "",
			},
			offer,
		});
	};

	return (
		<Sheet
			open={open}
			onOpenChange={() => {
				handleClose();
			}}
		>
			<SheetContent className="sm:max-w-[700px] flex gap-5 flex-col">
				<SheetHeader>
					<SheetTitle>Hotel Details</SheetTitle>
					<SheetDescription>{hotel?.name}</SheetDescription>
				</SheetHeader>
				<Flex isColumn gap="4">
					{rating?.numberOfRatings ? (
						<>
							<Flex justify="between">
								<Flex isColumn gap="2" align="start">
									<Label.Thin300>
										Number of ratings
									</Label.Thin300>
									<Label.Mid500>
										{rating?.numberOfRatings}
									</Label.Mid500>
								</Flex>
								<Flex isColumn gap="2" align="start">
									<Label.Thin300>Availability</Label.Thin300>
									<Label.Mid500>
										{rating?.numberOfReviews}
									</Label.Mid500>
								</Flex>
							</Flex>
							<Flex isColumn gap="2" align="start">
								<Label.Thin300>Rating</Label.Thin300>
								<Rating
									value={(rating?.overallRating || 1) / 100}
									ratingType={ERatingType.DETAILS}
								/>
							</Flex>{" "}
						</>
					) : null}
					<Flex isColumn gap="2" className="overflow-y-scroll">
						{offers?.[0].offers.map((offer) => (
							<BookingCard
								key={offer.id}
								offer={offer}
								onBookOffer={onBookOffer}
							/>
						)) || (
							<Label.Mid500>
								No offers available for this hotel
							</Label.Mid500>
						)}
					</Flex>
				</Flex>
			</SheetContent>
		</Sheet>
	);
}
