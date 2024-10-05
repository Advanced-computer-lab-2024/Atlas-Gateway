import axios from "axios";
import { RotateCw, Trash } from "lucide-react";
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

import AddForm from "./AddForm";

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
			.get("http://localhost:5000/api/admin/list")
			.then((res) => {
				setAdmins(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [refresh]);

	const handleDelete = (id: string) => {
		axios
			.delete(`http://localhost:5000/api/admin/delete/${id}`)
			.then((res) => {
				setRefresh(!refresh);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="flex flex-col p-3">
			<div className="flex self-end pb-3">
				<AddForm type="admin" />
			</div>
			<div>
				<Table className="shadow-lg">
					<TableCaption>Registered Admins.</TableCaption>
					<TableHeader className="bg-gray-100">
						<TableRow>
							<TableHead>Username</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Password</TableHead>
							<TableHead className="cursor-pointer hover:text-[#2b58ed] w-1">
								<RotateCw
									onClick={() => setRefresh(!refresh)}
								/>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{admins.map((admin) => (
							<TableRow key={admin._id}>
								<TableCell>{admin.username}</TableCell>
								<TableCell>{admin.email}</TableCell>
								<TableCell>{admin.password}</TableCell>
								<TableCell className="cursor-pointer hover:text-red-600 w-1">
									<button className="bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600">
										<Trash
											className="w-4 h-4"
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
		</div>
	);
};

export default Admins;
