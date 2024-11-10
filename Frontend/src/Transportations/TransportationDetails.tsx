import { formatDate } from "date-fns";
import { ArrowLeft, DollarSign, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useTouristProfile } from "@/api/data/useProfile";
import {
	useBookTransportation,
	useCancelTransportationBooking,
	useTransportation,
} from "@/api/data/useTransportations";
import Label from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";
import useCurrency from "@/hooks/useCurrency";
import { EAccountType } from "@/types/enums";

export default function TransportationDetails() {
	const navigate = useNavigate();
	const convertCurrency = useCurrency();
	const { data: user } = useTouristProfile();
	const { data, refetch } = useTransportation();
	const { doBookTransportation } = useBookTransportation(() => {
		refetch();
	});
	const { doCancelTransportationBooking } = useCancelTransportationBooking(
		() => {
			refetch();
		},
	);

	const {
		name,
		type,
		pickUpLocation,
		dropOffLocation,
		pickUpTime,
		dropOffTime,
		price,
		tourists,
	} = data || {};

	return (
		<Flex
			justify="center"
			align="center"
			className="p-4 overflow-y-scroll w-full h-full"
		>
			<Card className="w-[80%] border-black border-2">
				<CardHeader>
					<Flex justify="between" align="center">
						<Flex gap="2" align="center">
							<ArrowLeft
								className="cursor-pointer"
								onClick={() => navigate("/transportations")}
								size={32}
							/>
							<Label.Big600>{name}</Label.Big600>
						</Flex>
						{user?.type === EAccountType.Tourist &&
							(tourists?.includes(user?._id) ? (
								<Button
									size="lg"
									onClick={() => {
										if (data?._id) {
											doCancelTransportationBooking(
												data?._id,
											);
										}
									}}
								>
									Cancel
								</Button>
							) : (
								<Button
									size="lg"
									onClick={() => {
										if (data?._id) {
											doBookTransportation(data?._id);
										}
									}}
								>
									Book Now
								</Button>
							))}
					</Flex>
				</CardHeader>
				<CardContent className="grid grid-cols-2 w-full">
					<Flex
						isColumn
						gap="3"
						align="center"
						className="w-full border-r border-solid pr-2"
					>
						<Flex gap="2" isColumn>
							<Label.Thin300>Type</Label.Thin300>
							<Label.Mid500 className="overflow-ellipsis">
								{type}
							</Label.Mid500>
						</Flex>
						<Flex gap="2" isColumn>
							<Label.Thin300>Pick Up Location</Label.Thin300>
							<Flex gap="2" align="center">
								<Label.Mid500 className="overflow-ellipsis">
									{pickUpLocation}
								</Label.Mid500>
								<MapPin size={24} />
							</Flex>
						</Flex>
						<Flex gap="2" isColumn>
							<Label.Thin300>Drop Off Location</Label.Thin300>
							<Flex gap="2" align="center">
								<Label.Mid500 className="overflow-ellipsis">
									{dropOffLocation}
								</Label.Mid500>
								<MapPin size={24} />
							</Flex>
						</Flex>
						<Flex gap="2" isColumn>
							<Label.Thin300>Pick Up Time</Label.Thin300>
							<Label.Mid500 className="overflow-ellipsis">
								{pickUpTime &&
									formatDate(
										new Date(pickUpTime),
										"dd/MM/yyyy HH:mm:ss a",
									)}
								
							</Label.Mid500>
						</Flex>
						<Flex gap="2" isColumn>
							<Label.Thin300>Drop Off Time</Label.Thin300>
							<Label.Mid500 className="overflow-ellipsis">
								{dropOffTime &&
									formatDate(
										new Date(dropOffTime),
										"dd/MM/yyyy HH:mm:ss a",
									)}
							</Label.Mid500>
						</Flex>
						<Flex gap="2" isColumn>
							<Label.Thin300>Price:</Label.Thin300>
							<Flex gap="2" align="center">
								<DollarSign size={20} />
								<Label.Mid500>
									{convertCurrency(price)}
								</Label.Mid500>
							</Flex>
						</Flex>
					</Flex>
				</CardContent>
			</Card>
		</Flex>
	);
}
