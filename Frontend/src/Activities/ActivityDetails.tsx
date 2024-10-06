import { formatDate } from "date-fns";
import { ArrowLeft, DollarSign, MapPin, Star } from "lucide-react";
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
		description,
		specialDiscounts,
		isOpen,
		location,
		maxPrice,
		minPrice,
		avgRating,
		tags,
	} = data || {};

	return (
		<Flex
			isColumn
			gap="4"
			align="center"
			className="px-4 py-4 overflow-y-scroll"
		>
			<Card className="w-[80%] h-[500px] flex-col border-surface-secondary border-2 p-4">
				<Flex isColumn gap="4">
					<Flex gap="2" align="center">
						<ArrowLeft
							className="cursor-pointer"
							onClick={() => navigate("/activities")}
							size={32}
						/>
						<Label.Big600>{name}</Label.Big600>
					</Flex>
					<Flex gap="12">
						<Flex isColumn justify="around">
							<Flex gap="2" align="center">
								<Label.Big600 className="w-52 text-left">
									Description:{" "}
								</Label.Big600>
								<Label.Mid500 className="overflow-ellipsis">
									{description}
								</Label.Mid500>
							</Flex>
							<Flex gap="2" align="center">
								<Label.Big600 className="w-52 text-left">
									Location:{" "}
								</Label.Big600>
								<Label.Mid500 className="overflow-ellipsis">
									{location}
								</Label.Mid500>
								<MapPin size={32} />
							</Flex>
							<Flex gap="2" align="center">
								<Label.Big600 className="w-52 text-left">
									Date & Time:{" "}
								</Label.Big600>
								<Label.Mid500 className="overflow-ellipsis">
									{dateTime &&
										formatDate(
											new Date(dateTime),
											"dd/MM/yyyy, HH:mm:ss a",
										)}
								</Label.Mid500>
							</Flex>
							<Flex gap="2" align="center">
								<Label.Big600 className="w-52 text-left">
									Rating:{" "}
								</Label.Big600>
								<Label.Mid500 className="overflow-ellipsis">
									{avgRating}
								</Label.Mid500>
								<Star color="yellow" fill="yellow" size={32} />
							</Flex>
							<Flex gap="2" align="center">
								<Label.Big600 className="w-52 text-left">
									Price:{" "}
								</Label.Big600>
								<DollarSign size={20} />
								<Label.Thin300 className="overflow-ellipsis">
									{minPrice} - {maxPrice}
								</Label.Thin300>
							</Flex>
							<Flex gap="2" align="center">
								<Label.Big600 className="w-52 text-left">
									Special discounts:{" "}
								</Label.Big600>
								<Label.Mid500 className="overflow-ellipsis">
									{specialDiscounts}
								</Label.Mid500>
							</Flex>
							<Flex gap="2" align="center">
								<Label.Big600 className="overflow-ellipsis w-52 text-left">
									Categories:
								</Label.Big600>
								{categories && categories.length > 0 ? (
									<Flex
										gap="1"
										align="center"
										className="overflow-x-scroll w-full"
									>
										{categories?.map((category) => (
											<Badge
												key={category?._id}
												variant={"default"}
											>
												{category?.name}
											</Badge>
										))}
									</Flex>
								) : (
									"N/A"
								)}
							</Flex>
							<Flex gap="2" align="center">
								<Label.Big600 className="w-52 text-left">
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
												key={tag?._id}
												variant={"default"}
											>
												{tag?.name}
											</Badge>
										))}
									</Flex>
								) : (
									"N/A"
								)}
							</Flex>
							<Flex gap="2" align="center">
								<Label.Big600 className="w-52 text-left">
									Available to book:{" "}
								</Label.Big600>
								<Label.Thin300 className="overflow-ellipsis">
									{isOpen ? "Yes" : "No"}
								</Label.Thin300>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Card>
		</Flex>
	);
}