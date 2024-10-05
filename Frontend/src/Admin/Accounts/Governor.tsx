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

import AddForm from "./AddForm";

interface Governor {
	_id: string;
	username: string;
	email: string;
	password: string;
}

const Governor = () => {
	const [Governors, setGovernors] = useState<Governor[]>([]);
	const [refresh, setRefresh] = useState<boolean>(false);

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/governor/list")
			.then((res) => {
				setGovernors(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [refresh]);

	const handleDelete = (id: string) => {
		axios
			.delete(`http://localhost:8000/api/governor/delete/${id}`)
			.then((res) => {
				setRefresh(!refresh);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="flex flex-col p-3 overflow-hidden">
			<div className="flex self-end pb-3">
				<AddForm type="governor" />
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
						{Governors.map((governor) => (
							<TableRow key={governor._id}>
								<TableCell className="p-3">
									{governor.username}
								</TableCell>
								<TableCell>{governor.email}</TableCell>
								<TableCell>{governor.password}</TableCell>
								<TableCell className="cursor-pointer hover:text-red-600 w-1">
									<button className="bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600">
										<Trash
											className="w-4 h-4"
											onClick={() => {
												handleDelete(governor._id);
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

export default Governor;
