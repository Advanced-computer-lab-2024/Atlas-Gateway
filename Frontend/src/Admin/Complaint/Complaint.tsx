import { EllipsisVertical, Eye, RotateCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useComplaints } from "@/api/data/useComplaints";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const Complaint = () => {
	const { data, refetch } = useComplaints();
	console.log(data);
	const navigate = useNavigate();

	return (
		<div className="flex flex-col p-3">
			<div>
				<Table className="shadow-lg">
					<TableCaption>Complaints from tourists.</TableCaption>
					<TableHeader className="bg-gray-100">
						<TableRow>
							{/* <TableHead>Name</TableHead> */}
							<TableHead className="p-3">Tourist Name</TableHead>
							<TableHead className="p-3">
								Complaint Title
							</TableHead>
							<TableHead className="p-3">
								Complaint Date
							</TableHead>
							<TableHead className="p-3">State</TableHead>
							<TableHead></TableHead>
							<TableHead></TableHead>
							<TableHead className="cursor-pointer hover:text-[#2b58ed] w-1">
								<RotateCw onClick={() => refetch()} />
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data?.map((complaint) => (
							<TableRow key={complaint._id}>
								<TableCell>
									{complaint.createdBy?.username}
								</TableCell>
								<TableCell>{complaint.title}</TableCell>
								<TableCell>{complaint.date}</TableCell>
								<TableCell>{complaint.state}</TableCell>
								<DropdownMenu modal={false}>
									<DropdownMenuTrigger className="absolute right-0">
										<EllipsisVertical className="cursor-pointer hover:text-[#2b58ed]" />
									</DropdownMenuTrigger>

									<DropdownMenuContent>
										<DropdownMenuItem
											className="flex gap-2 cursor-pointer hover:text-[#2b58ed]"
											onClick={() => {
												navigate(
													`/admin/complaint/${complaint?._id}`,
												);
											}}
										>
											<Eye />
											View Details
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};
export default Complaint;
