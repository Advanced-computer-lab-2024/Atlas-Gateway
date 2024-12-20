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
	useAdvertisers,
	useDeleteAdvertiserProfile,
} from "@/api/data/useProfile";
import { TAdvertiserProfileResponse } from "@/api/service/types";
import AreYouSure from "@/components/ui/AreYouSure";
import { Button } from "@/components/ui/button";
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

const Advertisers = () => {
	const { user } = useLoginStore();
	const { data, refetch } = useAdvertisers();
	const { doDeleteAdvertiserProfile } = useDeleteAdvertiserProfile(refetch);
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
				`http://localhost:5000/api/advertiser/update/${id}`,
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
			<Table className="shadow-lg">
				<TableCaption>Registered Advertisers.</TableCaption>
				<TableHeader className="bg-gray-100">
					<TableRow>
						<TableHead>Username</TableHead>
						<TableHead>Email</TableHead>
						{/* <TableHead>Password</TableHead> */}
						<TableHead>Hotline</TableHead>
						<TableHead>Website</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>isVerified</TableHead>
						<TableHead>ID</TableHead>
						<TableHead>registryCards</TableHead>
						<TableHead>Request To Delete</TableHead>
						<TableHead className="cursor-pointer hover:text-[#2b58ed]">
							<RotateCw onClick={() => refetch()} />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.map((advertiser: TAdvertiserProfileResponse) => (
						<TableRow key={advertiser._id}>
							<TableCell className="p-3">
								{advertiser.username}
							</TableCell>
							<TableCell>{advertiser.email}</TableCell>
							{/* <TableCell>{advertiser.password}</TableCell> */}
							<TableCell>{advertiser.hotline || "N/A"}</TableCell>
							<TableCell>
								<a
									href={advertiser.website || "N/A"}
									target="_blank"
								>
									{advertiser.website || "N/A"}
								</a>
							</TableCell>
							<TableCell>
								{advertiser.description || "N/A"}
							</TableCell>
							<TableCell>
								{advertiser.isVerified ? (
									<ShieldCheck className="text-green-500 w-5 h-5" />
								) : (
									<button
										onClick={() =>
											handleUpdate(advertiser._id)
										}
									>
										<ShieldAlert className="text-red-500 w-5 h-5" />
									</button>
								)}
							</TableCell>
							<TableCell>
								<button
									onClick={() =>
										doDownload(advertiser.idPath)
									}
								>
									<IdCard />
								</button>
							</TableCell>
							<TableCell>
								<button
									onClick={() =>
										doDownload(advertiser.taxCardPath)
									}
								>
									<FileUser />
								</button>
							</TableCell>
							<TableCell>
								{advertiser.isDeleted
									? "Request Sent"
									: "Request Not Sent"}
							</TableCell>
							<TableCell className="cursor-pointer hover:text-[#2b58ed] w-1">
								<AreYouSure
									title="Are you sure you want to delete this advertiser?"
									description="This action is irreversible"
									onConfirm={() => {
										doDeleteAdvertiserProfile(
											advertiser._id,
										);
									}}
								>
									<Button size="icon" variant="destructive">
										<Trash className="w-4 h-4" />
									</Button>
								</AreYouSure>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default Advertisers;
