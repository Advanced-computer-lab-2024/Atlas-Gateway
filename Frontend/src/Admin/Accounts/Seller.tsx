import axios from "axios";
import { RotateCw, ShieldAlert, ShieldCheck, Trash } from "lucide-react";
// Import both icons
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
import { useLoginStore } from "@/store/loginStore";

interface Seller {
	_id: string;
	username: string;
	name: string;
	email: string;
	password: string;
	picture: string;
	description: string;
	isDeleted: boolean;
	products: string[];
	isVerified: boolean;
}

const Sellers = () => {
	const { user } = useLoginStore();
	const [sellers, setSellers] = useState<Seller[]>([]);
	const [refresh, setRefresh] = useState<boolean>(false);

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/seller/list")
			.then((res) => {
				setSellers(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [refresh]);

	const handleUpdate = (id: string) => {
		axios
			.put(`http://localhost:5000/api/seller/update/${id}`, {
				isVerified: true,
				headers: {
					userid: user?._id,
				},
			})
			.then((res) => {
				console.log(res.status);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleDelete = (id: string) => {
		axios
			.delete(`http://localhost:5000/api/seller/delete/${id}`)
			.then((res) => {
				setRefresh(!refresh);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="flex flex-col p-3">
			<Table className="shadow-lg">
				<TableCaption>Registered Sellers.</TableCaption>
				<TableHeader className="bg-gray-100">
					<TableRow>
						<TableHead>Picture</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Username</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Password</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>isVerified</TableHead>
						<TableHead className="cursor-pointer hover:text-[#2b58ed] w-1">
							<RotateCw onClick={() => setRefresh(!refresh)} />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{sellers.map((seller) => (
						<TableRow key={seller._id}>
							<TableCell>{seller?.picture || "N/A"}</TableCell>
							<TableCell>{seller?.name}</TableCell>
							<TableCell className="p-3">
								{seller.username}
							</TableCell>
							<TableCell>{seller.email}</TableCell>
							<TableCell>{seller.password}</TableCell>
							<TableCell>
								{seller?.description || "N/A"}
							</TableCell>
							<TableCell>
								{seller.isVerified ? (
									<ShieldCheck className="text-green-500 w-5 h-5" />
								) : (
									<button
										onClick={() => handleUpdate(seller._id)}
									>
										<ShieldAlert className="text-red-500 w-5 h-5" />
									</button>
								)}
							</TableCell>
							<TableCell className="cursor-pointer hover:text-[#2b58ed]">
								<button className="bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600">
									<Trash
										className="w-4 h-4"
										onClick={() => {
											handleDelete(seller._id);
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

export default Sellers;
