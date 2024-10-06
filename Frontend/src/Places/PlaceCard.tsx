import { EllipsisVertical, LocateIcon, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Label from "@/components/ui/Label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Flex } from "@/components/ui/flex";
import { TPlace } from "@/types/global";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/togglegroup";

export default function PlaceCard({
	id,
	name,
	description,
	location,
	images,
	tags,
	categories,
	rating,
}: TPlace) {
	const navigate = useNavigate();

	return (
		<Card
			key={id}
			className="w-full h-[400px] flex gap-1 flex-col border-surface-secondary border-2"
		>
			<Flex
				align="center"
				justify="center"
				className="w-full h-52 bg-gray-200 rounded-t-xl"
			>
				{images?.[0] ? (
					<img src={images[0]} />
				) : (
					<LocateIcon className="w-full h-40" />
				)}
			</Flex>
			<CardContent className="p-2">
				<Flex isColumn gap="2">
					<Flex gap="2" align="center" justify="between">
						<Label.Mid500>{name}</Label.Mid500>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<EllipsisVertical className="cursor-pointer" />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem
									onClick={() => {
										navigate(`/places/${id}`);
									}}
									className="border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md"
								>
									View Place Details
								</DropdownMenuItem>

								{/* from here */}

								<Dialog>
									<DialogTrigger asChild>
										<Button variant="outline" className="w-full text-left">Edit Place</Button>
									</DialogTrigger>
									<DialogContent className="sm:max-w-[700px]" id="test">
										<DialogHeader>
											<DialogTitle>Edit Place</DialogTitle>
										</DialogHeader>
										<div className="grid grid-cols-2 gap-4 py-4">
											<div id="info">
												<div className="grid grid-cols-4 items-center gap-4 mb-1">
													<Label htmlFor="name" className="text-right" size={100} weight={"Thin"}>
														Name
													</Label>
													<Input
														placeholder="Enter the place's name"
														className="col-span-3"
													/>
												</div>
												<div className="grid grid-cols-4 items-center gap-4 mb-1">
													<Label htmlFor="username" className="text-right" size={100} weight={"Thin"}>
														Username
													</Label>
													<Textarea
														placeholder="Enter the place's description"
														className="col-span-3"
													/>
												</div>
												<div className="grid grid-cols-4 items-center gap-4 mb-1">
													<Label htmlFor="foreign-price" className="text-right" size={100} weight={"Thin"}>
														Foreigner's Ticket Price
													</Label>
													<Input
														id="foreign-price"
														type="number"
														placeholder="Enter the price for foreigners"
														className="col-span-3"
													/>
												</div>
												<div className="grid grid-cols-4 items-center gap-4 mb-1">
													<Label htmlFor="native-price" className="text-right" size={100} weight={"Thin"}>
														Native's Ticket Price
													</Label>
													<Input
														id="native-price"
														type="number"
														placeholder="Enter the price for natives"
														className="col-span-3"
													/>
												</div>
												<div className="grid grid-cols-4 items-center gap-4 mb-1">
													<Label htmlFor="student-price" className="text-right" size={100} weight={"Thin"}>
														Student's Ticket Price
													</Label>
													<Input
														id="student-price"
														type="number"
														placeholder="Enter the price for students"
														className="col-span-3"
													/>
												</div>
											</div>

											<div id="hours" className="w-full">
												<div className="grid grid-cols-4 items-center gap-4">
													<Label htmlFor="hours" className="text-right" size={100} weight={"Thin"}>
														Available Days
													</Label>
													<ToggleGroup
														variant="outline"
														type="multiple"
														className="mb-4 col-span-3"
													>
														<ToggleGroupItem value="sat">Sa</ToggleGroupItem>
														<ToggleGroupItem value="sun">Su</ToggleGroupItem>
														<ToggleGroupItem value="mon">Mo</ToggleGroupItem>
														<ToggleGroupItem value="tue">Tu</ToggleGroupItem>
														<ToggleGroupItem value="wed">We</ToggleGroupItem>
														<ToggleGroupItem value="thu">Th</ToggleGroupItem>
														<ToggleGroupItem value="fri">Fr</ToggleGroupItem>
													</ToggleGroup>
												</div>
											</div>
										</div>
										<DialogFooter>
											<Button type="submit">Save changes</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>

								{/* till here */}

							</DropdownMenuContent>
						</DropdownMenu>
					</Flex>
					<Label.Mid300>{description}</Label.Mid300>
					<Flex gap="2" align="center" justify="between">
						<Flex gap="2" align="center" justify="between">
							<MapPin size={20} />
							<Label.Thin200 className="overflow-ellipsis">
								{location}
							</Label.Thin200>
						</Flex>
						<Flex gap="1" align="center">
							<Star color="yellow" fill="yellow" size={20} />
							<Label.Thin300 className="overflow-ellipsis">
								{rating}
							</Label.Thin300>
						</Flex>
					</Flex>
					<Flex gap="2" align="center">
						<Label.Mid200 className="overflow-ellipsis w-[95px] text-left">
							Categories:
						</Label.Mid200>
						{categories.length > 0 ? (
							<Flex
								gap="1"
								align="center"
								className="overflow-x-scroll w-full"
							>
								{categories?.map((category) => (
									<Badge key={category} variant={"default"}>
										{category}
									</Badge>
								))}
							</Flex>
						) : (
							"N/A"
						)}
					</Flex>
					<Flex gap="2" align="center">
						<Label.Mid200 className="overflow-ellipsis w-[95px] text-left">
							Tags:
						</Label.Mid200>
						{tags.length > 0 ? (
							<Flex
								gap="1"
								align="center"
								className="overflow-x-scroll w-full"
							>
								{tags?.map((tag) => (
									<Badge key={tag} variant={"default"}>
										{tag}
									</Badge>
								))}
							</Flex>
						) : (
							"N/A"
						)}
					</Flex>
				</Flex>
			</CardContent>
		</Card>
	);
}
