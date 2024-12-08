import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

import { useActivity, useBookActivity } from "@/api/data/useActivities";
import { useTouristProfile } from "@/api/data/useProfile";
import Label from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import { Input } from "@/components/ui/input";
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
	const { data: activity, refetch } = useActivity();
	const { data, refetch: refetchUserProfile } = useTouristProfile();
	const [promo, setPromo] = useState("");
	const formatCurrency = useCurrency();
	const stripePromise = loadStripe(
		import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!,
	);
	const { doBookActivity } = useBookActivity(async () => {
		refetch();
		refetchUserProfile();
	});
	const handleWalletPayment = async () => {
		doBookActivity({
			id: activity?._id!,
			paymentType: "wallet",
			amount: activity?.maxPrice || 0,
			promoCode: promo,
		});
	};
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">Book Activity</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Payment Form</SheetTitle>
					<SheetDescription>
						Please select a payment method to book this Activity.
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
							<Flex>
								<Label.Thin300>
									Wallet Balance:{" "}
									<Label.Thin400>
										{formatCurrency(data?.walletBalance)}
									</Label.Thin400>
								</Label.Thin300>
							</Flex>
							<Flex>
								<Input
									type="text"
									placeholder="Enter Promo Code"
									value={promo}
									onChange={(e) => setPromo(e.target.value)}
								/>
							</Flex>
						</Flex>

						<Button
							onClick={() => handleWalletPayment()}
							className="mt-4"
						>
							Book Activity
						</Button>
					</TabsContent>
					<TabsContent value="credit_card" className="mt-4">
						<Elements
							stripe={stripePromise}
							options={{
								mode: "payment",
								amount: parseFloat(amount) * 100,
								currency:
									data?.currency.toLocaleLowerCase() || "egp",
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
