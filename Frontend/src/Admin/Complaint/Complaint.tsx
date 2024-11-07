import { formatDate } from "date-fns";
import { RotateCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useComplaints } from "@/api/data/useComplaints";
import { useQueryString } from "@/api/data/useQueryString";
import Filters from "@/components/Filters/Filters";
import Label from "@/components/ui/Label";
import { Flex } from "@/components/ui/flex";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
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

	const navigate = useNavigate();
	const [query, setQuery] = useQueryString();

	return (
		<div className="flex flex-col p-3 gap-4">
			<Flex align="center" justify="between">
				<Flex gap="2" align="center">
					<Label.Mid300>Sort:</Label.Mid300>
					<Select
						onValueChange={(value) => {
							if (value === "0") {
								setQuery({
									...query,
									sort: undefined,
								});
							} else {
								setQuery({
									...query,
									sort: value,
								});
							}
						}}
					>
						<SelectTrigger className="bg-white">
							<SelectValue placeholder="Sort" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="0">None</SelectItem>
							<SelectItem value="createdAt,1">
								Ascending Creation Date
							</SelectItem>
							<SelectItem value="createdAt,-1">
								Descending Creation Date
							</SelectItem>
							<SelectItem value="updatedAt,1">
								Ascending Latest Update Date
							</SelectItem>
							<SelectItem value="updatedAt,-1">
								Descending Latest Update Date
							</SelectItem>
						</SelectContent>
					</Select>
				</Flex>
				<Filters
					filters={{
						status: {
							filterName: "status",
							label: "Status",
							type: "checkbox",
							options: [
								{
									value: "pending",
									label: "Pending",
								},
								{
									value: "resolved",
									label: "Resolved",
								},
							],
						},
					}}
				/>
			</Flex>
			<Table className="shadow-lg">
				<TableCaption>Complaints from tourists.</TableCaption>
				<TableHeader className="bg-gray-100">
					<TableRow>
						{/* <TableHead>Name</TableHead> */}
						<TableHead className="p-3">Tourist Name</TableHead>
						<TableHead className="p-3">Complaint Title</TableHead>
						<TableHead className="p-3">Creation Date</TableHead>
						<TableHead className="p-3">
							Lastest Update Date
						</TableHead>
						<TableHead className="p-3">State</TableHead>
						<TableHead className="cursor-pointer hover:text-[#2b58ed] w-1">
							<RotateCw onClick={() => refetch()} />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.map((complaint) => (
						<TableRow
							key={complaint._id}
							onClick={() => {
								navigate(`/admin/complaints/${complaint?._id}`);
							}}
						>
							<TableCell>
								{complaint.createdBy?.username}
							</TableCell>
							<TableCell>{complaint.title}</TableCell>
							<TableCell>
								{formatDate(
									new Date(complaint.createdAt),
									"dd/MM/yyyy HH:mm:ss a",
								)}
							</TableCell>
							<TableCell>
								{formatDate(
									new Date(complaint.createdAt),
									"dd/MM/yyyy HH:mm:ss a",
								)}
							</TableCell>
							<TableCell>{complaint.status}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
export default Complaint;
