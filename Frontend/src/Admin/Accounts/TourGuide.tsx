import axios from "axios";
import {
	FileUser,
	IdCard,
	RotateCw,
	ShieldAlert,
	ShieldCheck,
	Trash,
} from "lucide-react";

import {
	useDeleteTourGuideProfile,
	useTourGuides,
	useUpdateTourGuideProfile,
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
	// const {doEditTourGuideProfile} = useUpdateTourGuideProfile(refetch);
	const { doDeleteTourGuideProfile } = useDeleteTourGuideProfile(refetch);

	const handleDownloadId = async (username: string, type: string) => {
		const filePath =
			type == "id"
				? `tour_guide/${username}_id.pdf`
				: `tour_guide/${username}_certificate.pdf`;
		axios
			.post("http://localhost:5000/api/register/download", { filePath })
			.then((res) => {
				const link = document.createElement("a");
				link.href = res.data;
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			})
			.catch((error) => {
				console.log(error);
			});
	};

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
						{/* <TableHead>Picture</TableHead> */}
						{/* <TableHead>Name</TableHead> */}
						<TableHead>Username</TableHead>
						<TableHead>Email</TableHead>
						{/* <TableHead>Password</TableHead> */}
						<TableHead>Mobile</TableHead>
						<TableHead>Experience</TableHead>
						<TableHead>Previous Work</TableHead>
						<TableHead>isVerified</TableHead>
						<TableHead>ID</TableHead>
						<TableHead>Certificates</TableHead>
						<TableHead className="cursor-pointer hover:text-[#2b58ed] w-1">
							<RotateCw onClick={() => refetch()} />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.map((tourGuide: TTourGuideProfileResponse) => (
						<TableRow key={tourGuide._id}>
							{/* <TableCell className="p-3">
								{tourGuide?.picture || "N/A"}
							</TableCell> */}
							{/* <TableCell>{tourGuide?.name}</TableCell> */}
							<TableCell>{tourGuide.username}</TableCell>
							<TableCell>{tourGuide.email}</TableCell>
							{/* <TableCell>{tourGuide.password}</TableCell> */}
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
									onClick={() =>
										handleDownloadId(
											tourGuide.username,
											"id",
										)
									}
								>
									<IdCard />
								</button>
							</TableCell>
							<TableCell>
								<button
									onClick={() =>
										handleDownloadId(
											tourGuide.username,
											"certificate",
										)
									}
								>
									<FileUser />
								</button>
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
