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

interface PreviousJob {
	title: string;
	description: string;
	company: string;
	start: Date;
	end: Date;
}

interface TourGuide {
	_id: string;
	username: string;
	email: string;
	password: string;
	description: string;
	picture: string;
	experience: string;
	previous: PreviousJob;
	itinerary: string[];
}

const TourGuide = () => {
	const [tourGuides, setTourGuides] = useState<TourGuide[]>([]);
	const [refresh, setRefresh] = useState<boolean>(false);

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/tourGuide/list")
			.then((res) => {
				setTourGuides(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [refresh]);

	const handleDelete = (id: string) => {
		axios
			.delete(`http://localhost:8000/api/tourGuide/delete/${id}`)
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
						<TableHead>Username</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Password</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Experience</TableHead>
						<TableHead>Previous Job Title</TableHead>
						<TableHead>Company</TableHead>
						<TableHead>Start Date</TableHead>
						<TableHead>End Date</TableHead>
						<TableHead></TableHead>
						<TableHead className="cursor-pointer hover:text-[#2b58ed] w-1">
							<RotateCw onClick={() => setRefresh(!refresh)} />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{tourGuides.map((tourGuide) => (
						<TableRow key={tourGuide._id}>
							<TableCell className="p-5">
								<img
									src={tourGuide.picture}
									alt={`${tourGuide.username}`}
									className="w-full h-auto"
								/>
							</TableCell>
							<TableCell>{tourGuide.username}</TableCell>
							<TableCell>{tourGuide.email}</TableCell>
							<TableCell>{tourGuide.password}</TableCell>
							<TableCell>{tourGuide.description}</TableCell>
							<TableCell>{tourGuide.experience}</TableCell>
							<TableCell>{tourGuide.previous.title}</TableCell>
							<TableCell>{tourGuide.previous.company}</TableCell>
							<TableCell>
								{new Date(
									tourGuide.previous.start,
								).toLocaleDateString()}
							</TableCell>
							<TableCell>
								{new Date(
									tourGuide.previous.end,
								).toLocaleDateString()}
							</TableCell>
							<TableCell className="cursor-pointer hover:text-[#2b58ed] w-1">
								<Pencil />
							</TableCell>
							<TableCell className="cursor-pointer hover:text-[#2b58ed] w-1">
								<Trash
									onClick={() => handleDelete(tourGuide._id)}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default TourGuide;
