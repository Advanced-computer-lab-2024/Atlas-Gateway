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
import { useDeleteSeller, useSellers } from "@/api/data/useProfile";
import { TSellerProfileResponse } from "@/api/service/types";
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

const Sellers = () => {
	const { user } = useLoginStore();
	const { data, refetch } = useSellers();
	const { doDeleteSeller } = useDeleteSeller(refetch);
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
				`http://localhost:5000/api/seller/update/${id}`,
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
				<TableCaption>Registered Sellers.</TableCaption>
				<TableHeader className="bg-gray-100">
					<TableRow>
						<TableHead>Username</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>isVerified</TableHead>
						<TableHead>ID</TableHead>
						<TableHead>taxationRegisteryCard</TableHead>
						<TableHead>Request To Delete</TableHead>
						<TableHead className="cursor-pointer hover:text-[#2b58ed] w-1">
							<RotateCw onClick={() => refetch()} />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.map((seller: TSellerProfileResponse) => (
						<TableRow key={seller._id}>
							<TableCell className="p-3">
								{seller.username}
							</TableCell>
							<TableCell>{seller.email}</TableCell>
							<TableCell>
								{seller?.description || "N/A"}
							</TableCell>
							<TableCell>
								{seller.isVerified ? (
									<ShieldCheck className="text-green-500 w-5 h-5" />
								) : (
									<button
										onClick={() => handleUpdate(seller._id)}
									>
										<ShieldAlert className="text-red-500 w-5 h-5" />
									</button>
								)}
							</TableCell>
							<TableCell>
								<button
									onClick={() => doDownload(seller.idPath)}
								>
									<IdCard />
								</button>
							</TableCell>
							<TableCell>
								<button
									onClick={() =>
										doDownload(seller.taxCardPath)
									}
								>
									<FileUser />
								</button>
							</TableCell>
							<TableCell>
								{seller.isDeleted
									? "Request Sent"
									: "Request Not Sent"}
							</TableCell>
							<TableCell className="cursor-pointer hover:text-[#2b58ed]">
								<AreYouSure
									title="Are you sure you want to delete this seller?"
									description="This action is irreversible"
									onConfirm={() => {
										doDeleteSeller(seller._id);
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

export default Sellers;
