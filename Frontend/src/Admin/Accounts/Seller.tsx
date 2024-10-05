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

interface Seller {
	_id: string;
	username: string;
	email: string;
	password: string;
	picture: string;
	description: string;
	isDeleted: boolean;
	products: string[];
}

const Sellers = () => {
	const [sellers, setSellers] = useState<Seller[]>([]);
	const [refresh, setRefresh] = useState<boolean>(false);

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/seller/list")
			.then((res) => {
				setSellers(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [refresh]);

	const handleDelete = (id: string) => {
		axios
			.delete(`http://localhost:8000/api/seller/delete/${id}`)
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
						<TableHead>Username</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Password</TableHead>
						<TableHead>Picture</TableHead>
						<TableHead>Description</TableHead>
						<TableHead className="cursor-pointer hover:text-[#2b58ed] w-1">
							<RotateCw onClick={() => setRefresh(!refresh)} />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{sellers.map((seller) => (
						<TableRow key={seller._id}>
							<TableCell className="p-3">
								{seller.username}
							</TableCell>
							<TableCell>{seller.email}</TableCell>
							<TableCell>{seller.password}</TableCell>
							<TableCell>{seller?.picture || "N/A"}</TableCell>
							<TableCell>
								{seller?.description || "N/A"}
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
