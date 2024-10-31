import axios from "axios";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { Trash } from "lucide-react";
import { RotateCw } from "lucide-react";

import {
	useAdvertisers,
	useDeleteAdvertiserProfile,
	useUpdateAdvertiserProfile,
} from "@/api/data/useProfile";
import { TAdvertiserProfileResponse } from "@/api/service/types";
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
							<TableCell className="cursor-pointer hover:text-[#2b58ed] w-1">
								<button className="bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600">
									<Trash
										className="w-4 h-4"
										onClick={() =>
											doDeleteAdvertiserProfile(
												advertiser._id,
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

export default Advertisers;
