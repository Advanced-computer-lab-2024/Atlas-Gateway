import axios from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";

import Label from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Flex } from "@/components/ui/flex";
import { Input } from "@/components/ui/input";

interface AddAddressPopupProps {
	userId?: string;
	refetchFunction: () => void;
}

const AddressDialogue = ({ userId, refetchFunction }) => {
	const [country, setCountry] = useState("");
	const [city, setCity] = useState("");
	const [street, setStreet] = useState("");
	const [building, setBuilding] = useState("");
	const [apartment, setApartment] = useState("");

	const saveAddress = async (
		address: {
			country: string;
			city: string;
			street: string;
			building?: string;
			apartment?: string;
		},
		userId?: string,
	) => {
		console.log("Address saved");
		//send axios request,
		let trigger = document.getElementById("dialog-trigger");

		await axios
			.post(
				"http://localhost:5000/api/orders/addAddress",
				{
					country: address.country,
					city: address.city,
					street: address.street,
					building: address.building,
					apartment: address.apartment,
				},
				{
					headers: {
						userid: userId,
					},
				},
			)
			.then(() => {
				//Success Handling
			})
			.catch(() => {
				//Fail Handling
			});

		refetchFunction();
	};

	const handleSubmit = async () => {
		const address = { country, city, street, building, apartment };
		saveAddress(address, userId);
	};

	return (
		<Dialog>
			<DialogTrigger
				id="dialog-trigger"
				className="bg-surface-primary ml-4 px-3 rounded-md hover:bg-yellow-500 disabled:bg-gray-400"
				disabled={false}
			>
				<Plus size={16} />
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Address</DialogTitle>
					<DialogDescription>
						<form onSubmit={handleSubmit}>
							<Flex isColumn className="pt-6 pb-6">
								<Flex isColumn>
									<Label.Mid400>Country</Label.Mid400>
									<Input
										value={country}
										onChange={(i) =>
											setCountry(i.target.value)
										}
									/>
								</Flex>
								<Flex isColumn>
									<Label.Mid400>City</Label.Mid400>
									<Input
										value={city}
										onChange={(i) =>
											setCity(i.target.value)
										}
									/>
								</Flex>
								<Flex isColumn>
									<Label.Mid400>Street</Label.Mid400>
									<Input
										value={street}
										onChange={(i) =>
											setStreet(i.target.value)
										}
									/>
								</Flex>
								<Flex isColumn>
									<Flex isColumn>
										<Label.Mid400>Building</Label.Mid400>
										<Input
											value={building}
											onChange={(i) =>
												setBuilding(i.target.value)
											}
											placeholder="(Optional)"
										/>
									</Flex>
									<Flex isColumn>
										<Label.Mid400>Apartment</Label.Mid400>
										<Input
											value={apartment}
											onChange={(i) =>
												setApartment(i.target.value)
											}
											placeholder="(Optional)"
										/>
									</Flex>
								</Flex>
							</Flex>
						</form>
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="sm:justify-center">
					<DialogClose asChild>
						<Button
							type="submit"
							onClick={() => handleSubmit()}
							className="mr-2"
						>
							Save Address
						</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button type="button" className="ml-2">
							Cancel
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AddressDialogue;
