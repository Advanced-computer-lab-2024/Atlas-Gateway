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
			.get("http://localhost:5000/api/tourist/list")
			.then((res) => {
				setTourists(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [refresh]);

	const handleDelete = (id: string) => {
		axios
			.delete(`http://localhost:5000/api/tourist/delete/${id}`)
			.then((res) => {
				setRefresh(!refresh);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="flex flex-col p-3 overflow-hidden">
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
							<TableCell>{tourist?.address || "N/A"}</TableCell>
							<TableCell>{tourist.wallet || "N/A"}</TableCell>
							<TableCell>{tourist?.currency || "N/A"}</TableCell>
							<TableCell>
								{tourist?.loyaltyPoints || "N/A"}
							</TableCell>
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
								<button className="bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600">
									<Trash
										className="w-4 h-4"
										onClick={() => {
											handleDelete(tourist._id);
										}}
									/>
								</button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default Tourist;
