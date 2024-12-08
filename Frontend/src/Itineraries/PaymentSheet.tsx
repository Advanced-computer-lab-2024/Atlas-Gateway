import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useBookItinerary, useItinerary } from "@/api/data/useItineraries";
import { useTouristProfile } from "@/api/data/useProfile";
import Label from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useCurrency from "@/hooks/useCurrency";

import OnlinePayment from "./OnlinePayment";

interface props {
	amount: string;
}

export function PaymentSheet({ amount }: props) {
	const { data: itinerary, refetch } = useItinerary();
	const formatCurrency = useCurrency();
	const { data, refetch: refetchUserProfile } = useTouristProfile();
	const stripePromise = loadStripe(
		import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!,
	);
	const { doBookItinerary } = useBookItinerary(async () => {
		refetch();
		refetchUserProfile();
	});
	const handlePayment = async () => {
		doBookItinerary({
			id: itinerary?._id!,
			paymentType: "wallet",
			amount: itinerary?.price!,
		});
	};
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">Book Itinerary</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Payment Form</SheetTitle>
					<SheetDescription>
						Please select a payment method to book this Itinerary.
					</SheetDescription>
				</SheetHeader>
				<Tabs defaultValue="cash" className="w-full">
					<TabsList className="grid w-full grid-cols-2 border-2 border-black">
						<TabsTrigger value="wallet">Wallet</TabsTrigger>
						<TabsTrigger value="credit_card">
							Credit Card
						</TabsTrigger>
					</TabsList>
					<TabsContent value="wallet" className="flex flex-col mt-4">
						<Flex>
							<Label.Thin300>
								Your Wallet Balance:{" "}
								<Label.Thin400>
									{formatCurrency(data?.walletBalance)}
								</Label.Thin400>
							</Label.Thin300>
						</Flex>
						<Button
							onClick={() => handlePayment()}
							className="mt-4"
						>
							Book Itinerary
						</Button>
					</TabsContent>
					<TabsContent value="credit_card" className="mt-4">
						<Elements
							stripe={stripePromise}
							options={{
								mode: "payment",
								amount: parseFloat(amount) * 100,
								currency:
									data?.currency?.toLocaleLowerCase() ||
									"egp",
								locale: "en",
								loader: "auto",
							}}
						>
							<OnlinePayment
								amount={parseFloat(amount)}
								currency={data?.currency || ""}
							/>
						</Elements>
					</TabsContent>
				</Tabs>
			</SheetContent>
		</Sheet>
	);
}
