import axios from "axios";
import {
	FileUser,
	IdCard,
	RotateCw,
	ShieldAlert,
	ShieldCheck,
	Trash,
} from "lucide-react";

import { useDeleteSeller, useSellers } from "@/api/data/useProfile";
import { TSellerProfileResponse } from "@/api/service/types";
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
	const handleDownload = async (username: string, type: string) => {
		const filePath =
			type == "id"
				? `seller/${username}_id.pdf`
				: `seller/${username}_taxationRegisteryCard.pdf`;
		axios
			.post("http://localhost:5000/api/register/download", { filePath })
			.then((res) => {
				const link = document.createElement("a");
				link.href = res.data;
				link.target = "_blank";
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
						{/* <TableHead>Picture</TableHead> */}
						{/* <TableHead>Name</TableHead> */}
						<TableHead>Username</TableHead>
						<TableHead>Email</TableHead>
						{/* <TableHead>Password</TableHead> */}
						<TableHead>Description</TableHead>
						<TableHead>isVerified</TableHead>
						<TableHead>ID</TableHead>
						<TableHead>taxationRegisteryCard</TableHead>
						<TableHead className="cursor-pointer hover:text-[#2b58ed] w-1">
							<RotateCw onClick={() => refetch()} />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.map((seller: TSellerProfileResponse) => (
						<TableRow key={seller._id}>
							{/* <TableCell>{seller?.picture || "N/A"}</TableCell> */}
							{/* <TableCell>{seller?.name}</TableCell> */}
							<TableCell className="p-3">
								{seller.username}
							</TableCell>
							<TableCell>{seller.email}</TableCell>
							{/* <TableCell>{seller.password}</TableCell> */}
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
									onClick={() =>
										handleDownload(seller.username, "id")
									}
								>
									<IdCard />
								</button>
							</TableCell>
							<TableCell>
								<button
									onClick={() =>
										handleDownload(
											seller.username,
											"taxationRegisteryCard",
										)
									}
								>
									<FileUser />
								</button>
							</TableCell>
							<TableCell className="cursor-pointer hover:text-[#2b58ed]">
								<button className="bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600">
									<Trash
										className="w-4 h-4"
										onClick={() => {
											doDeleteSeller(seller._id);
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

export default Sellers;
