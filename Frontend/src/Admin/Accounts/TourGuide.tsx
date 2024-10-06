import axios from "axios";
import { Pencil, ShieldAlert, ShieldCheck } from "lucide-react";
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

// interface PreviousJob {
// 	title: string;
// 	description: string;
// 	company: string;
// 	start: Date;
// 	end: Date;
// }

interface TourGuide {
	_id: string;
	name: string;
	username: string;
	email: string;
	password: string;
	Mobile: string;
	picture: string;
	experience: string;
	prevWork: string;
	isVerified: boolean;
}

const TourGuide = () => {
	const [tourGuides, setTourGuides] = useState<TourGuide[]>([]);
	const [refresh, setRefresh] = useState<boolean>(false);

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/tourGuide/list")
			.then((res) => {
				setTourGuides(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [refresh]);

	const handleUpdate = (id: string) => {
		axios
			.put(`http://localhost:5000/api/tourguide/update/${id}`, {
				isVerified: true,
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
			.delete(`http://localhost:5000/api/tourGuide/delete/${id}`)
			.then((res) => {
				setRefresh(!refresh);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="flex flex-col p-3">
			<Table className="shadow-lg ">
				<TableCaption>Registered Tour Guides.</TableCaption>
				<TableHeader className="bg-gray-100">
					<TableRow>
						<TableHead>Picture</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Username</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Password</TableHead>
						<TableHead>Mobile</TableHead>
						<TableHead>Experience</TableHead>
						<TableHead>Previous Work</TableHead>
						<TableHead>isVerified</TableHead>
						<TableHead></TableHead>
						<TableHead className="cursor-pointer hover:text-[#2b58ed] w-1">
							<RotateCw onClick={() => setRefresh(!refresh)} />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{tourGuides.map((tourGuide) => (
						<TableRow key={tourGuide._id}>
							<TableCell className="p-3">
								{tourGuide?.picture || "N/A"}
							</TableCell>
							<TableCell>{tourGuide?.name}</TableCell>
							<TableCell>{tourGuide.username}</TableCell>
							<TableCell>{tourGuide.email}</TableCell>
							<TableCell>{tourGuide.password}</TableCell>
							<TableCell>{tourGuide?.Mobile || "N/A"}</TableCell>
							<TableCell>
								{tourGuide?.experience || "N/A"}
							</TableCell>
							<TableCell>
								{tourGuide?.prevWork || "N/A"}
							</TableCell>
							<TableCell>
								{tourGuide.isVerified ? (
									<ShieldCheck className="text-green-500 w-5 h-5" />
								) : (
									<button
										onClick={() =>
											handleUpdate(tourGuide._id)
										}
									>
										<ShieldAlert className="text-red-500 w-5 h-5" />
									</button>
								)}
							</TableCell>
							{/* <TableCell>
								{tourGuide.previous?.description || "N/A"}
							</TableCell> */}
							{/* <TableCell>
								{tourGuide.previous?.company || "N/A"}
							</TableCell> */}
							{/* <TableCell>
								{new Date(
									tourGuide.previous?.start,
								).toLocaleDateString()}
							</TableCell>
							<TableCell>
								{new Date(
									tourGuide.previous?.end,
								).toLocaleDateString()}
							</TableCell> */}
							<TableCell className="cursor-pointer hover:text-[#2b58ed] w-1">
								<button className="bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600">
									<Trash
										className="w-4 h-4"
										onClick={() => {
											handleDelete(tourGuide._id);
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

export default TourGuide;
