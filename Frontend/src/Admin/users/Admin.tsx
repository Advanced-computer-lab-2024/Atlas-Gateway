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

interface Admin {
	_id: string;
	username: string;
	email: string;
	password: string;
}

const Admins = () => {
	const [admins, setAdmins] = useState<Admin[]>([]);
	const [refresh, setRefresh] = useState<boolean>(false);

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/admin/list")
			.then((res) => {
				setAdmins(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [refresh]);

	const handleDelete = (id: string) => {
		axios
			.delete(`http://localhost:8000/api/admin/delete/${id}`)
			.then((res) => {
				setRefresh(!refresh);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="flex flex-col p-3">
			<SheetDemo />
			<Table className="shadow-lg">
				<TableCaption>Registered Admins.</TableCaption>
				<TableHeader className="bg-gray-100">
					<TableRow>
						<TableHead>Username</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Password</TableHead>
						<TableHead className="cursor-pointer hover:text-[#2b58ed] w-1">
							<RotateCw onClick={() => setRefresh(!refresh)} />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{admins.map((admin) => (
						<TableRow key={admin._id}>
							<TableCell className="p-3">
								{admin.username}
							</TableCell>
							<TableCell>{admin.email}</TableCell>
							<TableCell>{admin.password}</TableCell>
							{/* <TableCell className="cursor-pointer hover:text-[#2b58ed] w-1">
								<Pencil /> // this feature is disabled for sprint 1
							</TableCell> */}
							<TableCell className="cursor-pointer hover:text-red-600 w-1">
								<button className="bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600">
									<Trash
										className="w-5 h-5"
										onClick={() => {
											handleDelete(admin._id);
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

export default Admins;
