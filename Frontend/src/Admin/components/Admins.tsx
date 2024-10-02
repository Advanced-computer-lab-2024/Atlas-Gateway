import axios from "axios";
import { Ellipsis } from "lucide-react";
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

interface Admin {
	_id: string;
	userName: string;
	email: string;
	password: string;
}

const Admins = () => {
	const [admins, setAdmins] = useState<Admin[]>([]);
	useEffect(() => {
		axios
			.get("http://localhost:8000/api/admin/list")
			.then((res) => {
				setAdmins(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className="flex flex-col p-3 overflow-hidden">
			<button className="self-end w-fit p-2 m-2 bg-[#67b92d]">
				Add new Admin
			</button>
			<Table className="table-auto w-full">
				<TableCaption>Registered Admins.</TableCaption>
				<TableHeader className="bg-[#d9e2e6]">
					<TableRow>
						<TableHead className="">UserName</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Password</TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{admins.map((admin) => (
						<TableRow key={admin._id}>
							<TableCell className="font-medium p-3">
								{admin.userName}
							</TableCell>
							<TableCell className="p-3">{admin.email}</TableCell>
							<TableCell className="p-3">
								{admin.password}
							</TableCell>
							<TableHead className="w-[10px] cursor-pointer">
								<Ellipsis />
							</TableHead>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default Admins;
