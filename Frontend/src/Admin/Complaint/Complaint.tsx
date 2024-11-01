import { RotateCw } from "lucide-react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useComplaints } from "@/api/data/useComplaints";



const Complaint = () => {
	const { data, refetch } = useComplaints();

	return (
		<div className="flex flex-col p-3">
			
			<div>
				<Table className="shadow-lg">
					<TableCaption>Complaints from tourists.</TableCaption>
					<TableHeader className="bg-gray-100">
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Complaint Title</TableHead>
							<TableHead>Complaint Date</TableHead>
                            <TableHead>State</TableHead>
							<TableHead></TableHead>
							<TableHead className="cursor-pointer hover:text-[#2b58ed] w-1">
								<RotateCw onClick={() => refetch()} />
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data?.map((tag) => (
							<TableRow key={tag._id}>
								<TableCell className="p-3">
									{tag.touristname}
								</TableCell>
								<TableCell className="p-3">
									{tag.title}
								</TableCell>
								<TableCell className="p-3">
									{tag.date}
								</TableCell>
								<TableCell className="p-3">
									{tag.state}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default Complaint;
