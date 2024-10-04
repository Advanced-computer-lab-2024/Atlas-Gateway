import axios from "axios";
import { Pencil } from "lucide-react";
import { Trash } from "lucide-react";
import { RotateCw } from "lucide-react";
import { useEffect, useState } from "react";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import SheetDemo from "../components/SheetDemo";

interface Tourist {
	_id: string;
	username: string;
	email: string;
	password: string;
	wallet: number;
	address: string;
	currency: string;
	loyaltyPoints: number;
	isDeleted: boolean;
	profile?: {
		bio?: string;
		location?: string;
		image?: string;
	};
}

const Tourist = () => {
	const [tourists, setTourists] = useState<Tourist[]>([]);
	const [refresh, setRefresh] = useState<boolean>(false);

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/tourist/list")
			.then((res) => {
				setTourists(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [refresh]);

	const handleDelete = (id: string) => {
		axios
			.delete(`http://localhost:8000/api/admin/tourist/${id}`)
			.then((res) => {
				setRefresh(!refresh);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="flex flex-col p-3 overflow-hidden">
			<SheetDemo />
			<Table className="shadow-lg">
				<TableCaption>Registered Tourists.</TableCaption>
				<TableHeader className="bg-gray-100">
					<TableRow>
						<TableHead>Username</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Password</TableHead>
						<TableHead>Address</TableHead>
						<TableHead>Wallet</TableHead>
						<TableHead>Currency</TableHead>
						<TableHead>Loyalty Points</TableHead>
						<TableHead>Bio</TableHead>
						<TableHead>Location</TableHead>
						<TableHead>Profile Image</TableHead>
						<TableHead></TableHead>
						<TableHead className="cursor-pointer w-6 hover:text-[#2b58ed]">
							<RotateCw onClick={() => setRefresh(!refresh)} />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{tourists.map((tourist) => (
						<TableRow key={tourist._id}>
							<TableCell>{tourist.username}</TableCell>
							<TableCell>{tourist.email}</TableCell>
							<TableCell>{tourist.password}</TableCell>
							<TableCell>{tourist.address}</TableCell>
							<TableCell>{tourist.wallet}</TableCell>
							<TableCell>{tourist.currency}</TableCell>
							<TableCell>{tourist.loyaltyPoints}</TableCell>
							<TableCell>
								{tourist.profile?.bio || "N/A"}
							</TableCell>
							<TableCell>
								{tourist.profile?.location || "N/A"}
							</TableCell>
							<TableCell>
								{tourist.profile?.image ? (
									<img
										src={tourist.profile.image}
										alt="profile"
										className="w-8 h-8 rounded-full"
									/>
								) : (
									"N/A"
								)}
							</TableCell>
							<TableCell className="cursor-pointer w-6 hover:text-[#2b58ed]">
								<Trash
									onClick={() => handleDelete(tourist._id)}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default Tourist;
