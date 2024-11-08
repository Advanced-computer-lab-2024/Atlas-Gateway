import { Trash } from "lucide-react";
import { RotateCw } from "lucide-react";

import { useDeleteTouristProfile, useTourists } from "@/api/data/useProfile";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const Tourist = () => {
	const { data, refetch } = useTourists();
	const { doDeleteTouristProfile } = useDeleteTouristProfile(refetch);

	return (
		<div className="flex flex-col p-3 overflow-hidden">
			<Table className="shadow-lg">
				<TableCaption>Registered Tourists.</TableCaption>
				<TableHeader className="bg-gray-100">
					<TableRow>
						<TableHead>Username</TableHead>
						<TableHead>Email</TableHead>
						{/* <TableHead>Password</TableHead> */}
						<TableHead>Address</TableHead>
						<TableHead>Wallet</TableHead>
						<TableHead>Currency</TableHead>
						<TableHead>Loyalty Points</TableHead>
						{/* <TableHead>Bio</TableHead>
						<TableHead>Location</TableHead> */}
						{/* <TableHead>Profile Image</TableHead> */}
						<TableHead>Request To Delete</TableHead>
						<TableHead className="cursor-pointer w-6 hover:text-[#2b58ed]">
							<RotateCw onClick={() => refetch()} />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.map((tourist) => (
						<TableRow key={tourist._id}>
							<TableCell>{tourist.username}</TableCell>
							<TableCell>{tourist.email}</TableCell>
							{/* <TableCell>{tourist.password}</TableCell> */}
							<TableCell>{tourist?.address || "N/A"}</TableCell>
							<TableCell>
								{tourist.walletBalance || "N/A"}
							</TableCell>
							<TableCell>{tourist?.currency || "N/A"}</TableCell>
							<TableCell>
								{tourist?.loyaltyPoints || "N/A"}
							</TableCell>
							{/* <TableCell>{tourist?.bio || "N/A"}</TableCell>
							<TableCell>
								{tourist.profile?.location || "N/A"}
							</TableCell>
							<TableCell>
								{tourist.profile?.image ? (
									<img
										src={tourist.profile.image}
										alt="profile"
										className="w-8 h-8 rounded-full"
									/>
								) : (
									"N/A"
								)}
							</TableCell> */}
							<TableCell>
								{tourist.isDeleted
									? "Request Sent"
									: "Request Not Sent"}
							</TableCell>
							<TableCell className="cursor-pointer w-6 hover:text-[#2b58ed]">
								<button className="bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600">
									<Trash
										className="w-4 h-4"
										onClick={() => {
											doDeleteTouristProfile(tourist._id);
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

export default Tourist;
