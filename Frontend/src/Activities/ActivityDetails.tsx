import { formatDate } from "date-fns";
import { ArrowLeft, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useActivity } from "@/api/data/useActivities";
import Label from "@/components/ui/Label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";

export default function ActivityDetails() {
	const navigate = useNavigate();
	const { data } = useActivity();
	const {
		name,
		categories,
		dateTime,
		isBookingsOpen,
		location,
		maxPrice,
		minPrice,
		rating,
		tags,
	} = data || {};

	return (
		<Flex
			isColumn
			gap="4"
			align="center"
			className="px-4 py-4 overflow-y-scroll"
		>
			<Card className="w-[80%] flex-col border-surface-secondary border-2 p-4">
				<Flex isColumn gap="4">
					<Flex gap="2" align="center">
						<ArrowLeft
							className="cursor-pointer"
							onClick={() => navigate("/places")}
							size={32}
						/>
						<Label.Big600>{name}</Label.Big600>
					</Flex>
					<Flex gap="12">
						<Flex isColumn justify="around">
							<Flex gap="2" align="center">
								<Label.Big600 className="w-40 text-left">
									Date & Time:{" "}
								</Label.Big600>
								<Label.Mid500 className="overflow-ellipsis">
									{dateTime &&
										formatDate(
											new Date(dateTime),
											"dd/MM/yyyy HH:mm",
										)}
								</Label.Mid500>
								<MapPin size={32} />
							</Flex>
							<Flex gap="2" align="center">
								<Label.Big600 className="w-40 text-left">
									Rating:{" "}
								</Label.Big600>
								<Label.Mid500 className="overflow-ellipsis">
									{rating}
								</Label.Mid500>
								<Star color="yellow" fill="yellow" size={32} />
							</Flex>
							<Flex gap="2" align="center">
								<Label.Mid200 className="overflow-ellipsis w-[95px] text-left">
									Categories:
								</Label.Mid200>
								{categories && categories.length > 0 ? (
									<Flex
										gap="1"
										align="center"
										className="overflow-x-scroll w-full"
									>
										{categories?.map((category) => (
											<Badge
												key={category}
												variant={"default"}
											>
												{category}
											</Badge>
										))}
									</Flex>
								) : (
									"N/A"
								)}
							</Flex>
							<Flex gap="2" align="center">
								<Label.Big600 className="w-40 text-left">
									Tags:
								</Label.Big600>
								{tags && tags?.length > 0 ? (
									<Flex
										gap="1"
										align="center"
										className="overflow-x-scroll w-full"
									>
										{tags?.map((tag) => (
											<Badge
												key={tag}
												variant={"default"}
											>
												{tag}
											</Badge>
										))}
									</Flex>
								) : (
									"N/A"
								)}
							</Flex>
						</Flex>
					</Flex>
					<hr />
				</Flex>
			</Card>
		</Flex>
	);
}
