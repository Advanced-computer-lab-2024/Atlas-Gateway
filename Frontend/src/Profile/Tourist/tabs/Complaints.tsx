import { formatDate } from "date-fns";
import { capitalize } from "lodash";
import { Plus, RotateCw } from "lucide-react";
import { useState } from "react";

import { useProfileComplaints } from "@/api/data/useComplaints";
import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { TComplaint } from "@/types/global";

import AddComplaintSheet from "./AddComplaintSheet";
import ComplaintDetailsSheet from "./ComplaintDetailsSheet";

export default function Complaints() {
	const { data, refetch } = useProfileComplaints();

	const [isComplaintDetailsSheetOpen, setIsComplaintDetailsSheetOpen] =
		useState(false);
	const [selectedComplaint, setSelectedComplaint] = useState<
		TComplaint | undefined
	>();

	const [isNewComplaintSheetOpen, setIsNewComplaintSheetOpen] =
		useState(false);

	return (
		<Flex isColumn gap="4">
			<Flex align="center" justify="end">
				<Button
					className="flex gap-2"
					onClick={() => setIsNewComplaintSheetOpen(true)}
				>
					New Complaint <Plus />
				</Button>
			</Flex>
			<Table className="shadow-lg h-full">
				<TableHeader className="bg-gray-100">
					<TableRow>
						<TableHead className="p-3">Complaint Title</TableHead>
						<TableHead className="p-3">Complaint Date</TableHead>
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
							className="cursor-pointer"
							onClick={() => {
								setSelectedComplaint(complaint);
								setIsComplaintDetailsSheetOpen(true);
							}}
						>
							<TableCell>{complaint.title}</TableCell>
							<TableCell>
								{formatDate(
									new Date(complaint.date || "0"),
									"dd/MM/yyyy HH:mm:ss a",
								)}
							</TableCell>
							<TableCell>
								{formatDate(
									new Date(complaint.createdAt || "0"),
									"dd/MM/yyyy HH:mm:ss a",
								)}
							</TableCell>
							<TableCell>
								{formatDate(
									new Date(complaint.createdAt),
									"dd/MM/yyyy HH:mm:ss a",
								)}
							</TableCell>
							<TableCell>
								{capitalize(complaint.status)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<ComplaintDetailsSheet
				open={isComplaintDetailsSheetOpen}
				setOpen={setIsComplaintDetailsSheetOpen}
				complaint={selectedComplaint}
			/>
			<AddComplaintSheet
				open={isNewComplaintSheetOpen}
				setOpen={setIsNewComplaintSheetOpen}
			/>
		</Flex>
	);
}
