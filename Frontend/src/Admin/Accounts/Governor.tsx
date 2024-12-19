import { Trash } from "lucide-react";
import { RotateCw } from "lucide-react";

import { useDeleteGovernor, useGovernors } from "@/api/data/useGovernor";
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
								<TableCell className="cursor-pointer hover:text-red-600 w-1">
									<AreYouSure
										title="Are you sure you want to delete this governer?"
										description="This action is irreversible"
										onConfirm={() => {
											doDeleteGovernor(governor._id);
										}}
									>
										<Button
											size="icon"
											variant="destructive"
										>
											<Trash className="w-4 h-4" />
										</Button>
									</AreYouSure>
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
