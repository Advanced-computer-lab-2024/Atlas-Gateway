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
			<Table className="shadow-lg">
				<TableCaption>Registered Admins.</TableCaption>
				<TableHeader className="bg-gray-100">
					<TableRow>
						<TableHead>Username</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Password</TableHead>
						<TableHead></TableHead>
						<TableHead className="cursor-pointer hover:text-[#2b58ed] w-1">
							<RotateCw onClick={() => setRefresh(!refresh)} />
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
							<TableCell className="cursor-pointer hover:text-[#2b58ed] w-1">
								<Pencil />
							</TableCell>
							<TableCell className="cursor-pointer hover:text-[#2b58ed]">
								<Trash
									onClick={() => handleDelete(governor._id)}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default Governor;
