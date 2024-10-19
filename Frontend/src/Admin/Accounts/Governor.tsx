import { Trash } from "lucide-react";
import { RotateCw } from "lucide-react";

import { useDeleteGovernor, useGovernors } from "@/api/data/useGovernor";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { TGovernor } from "@/types/global";

import AddForm from "./AddForm";

interface Governor {
	_id: string;
	username: string;
	email: string;
	password: string;
}

const Governor = () => {
	const { data, refetch } = useGovernors();
	const { doDeleteGovernor } = useDeleteGovernor(refetch);

	return (
		<div className="flex flex-col p-3 overflow-hidden">
			<div className="flex self-end pb-3">
				<AddForm type="governor" />
			</div>
			<div>
				<Table className="shadow-lg">
					<TableCaption>Registered Governors.</TableCaption>
					<TableHeader className="bg-gray-100">
						<TableRow>
							<TableHead>Username</TableHead>
							<TableHead>Email</TableHead>
							{/* <TableHead>Password</TableHead> */}
							<TableHead className="cursor-pointer hover:text-[#2b58ed] w-1">
								<RotateCw onClick={() => refetch()} />
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data?.map((governor: TGovernor) => (
							<TableRow key={governor._id}>
								<TableCell className="p-3">
									{governor.username}
								</TableCell>
								<TableCell>{governor.email}</TableCell>
								{/* <TableCell>{governor.password}</TableCell> */}
								<TableCell className="cursor-pointer hover:text-red-600 w-1">
									<button className="bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600">
										<Trash
											className="w-4 h-4"
											onClick={() => {
												doDeleteGovernor(governor._id);
											}}
										/>
									</button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default Governor;
