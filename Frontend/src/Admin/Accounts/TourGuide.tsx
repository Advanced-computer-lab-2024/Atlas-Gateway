import axios from "axios";
import {
	FileUser,
	IdCard,
	RotateCw,
	ShieldAlert,
	ShieldCheck,
	Trash,
} from "lucide-react";

import { useDownload } from "@/api/data/useMedia";
import {
	useDeleteTourGuideProfile,
	useTourGuides,
} from "@/api/data/useProfile";
import { TTourGuideProfileResponse } from "@/api/service/types";
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

const TourGuide = () => {
	const { user } = useLoginStore();
	const { data, refetch } = useTourGuides();
	const { doDeleteTourGuideProfile } = useDeleteTourGuideProfile(refetch);
	const { doDownload } = useDownload((response) => {
		const link = document.createElement("a");
		link.href = response.data;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	});
	const handleUpdate = (id: string) => {
		axios
			.put(
				`http://localhost:5000/api/tourguide/update/${id}`,
				{
					isVerified: true,
				},
				{
					headers: {
						userid: user?._id,
					},
				},
			)
			.then((res) => {
				console.log(res.status);
				refetch();
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
						<TableHead>Username</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Mobile</TableHead>
						<TableHead>Experience</TableHead>
						<TableHead>Previous Work</TableHead>
						<TableHead>isVerified</TableHead>
						<TableHead>ID</TableHead>
						<TableHead>Certificates</TableHead>
						<TableHead>Request To Delete</TableHead>
						<TableHead className="cursor-pointer hover:text-[#2b58ed] w-1">
							<RotateCw onClick={() => refetch()} />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.map((tourGuide: TTourGuideProfileResponse) => (
						<TableRow key={tourGuide._id}>
							<TableCell>{tourGuide.username}</TableCell>
							<TableCell>{tourGuide.email}</TableCell>
							<TableCell>{tourGuide?.mobile || "N/A"}</TableCell>
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
							<TableCell>
								<button
									onClick={() => doDownload(tourGuide.idPath)}
								>
									<IdCard />
								</button>
							</TableCell>
							<TableCell>
								<button
									onClick={() =>
										doDownload(tourGuide.certificatePath)
									}
								>
									<FileUser />
								</button>
							</TableCell>
							<TableCell>
								{tourGuide.isDeleted
									? "Request Sent"
									: "Request Not Sent"}
							</TableCell>
							<TableCell className="cursor-pointer hover:text-[#2b58ed] w-1">
								<button className="bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600">
									<Trash
										className="w-4 h-4"
										onClick={() =>
											doDeleteTourGuideProfile(
												tourGuide._id,
											)
										}
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
