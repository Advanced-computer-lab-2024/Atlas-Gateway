import { RotateCw, Trash } from "lucide-react";

import { useAdmins, useDeleteAdmin } from "@/api/data/useAdmins";
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
import { TAdmin } from "@/types/global";

import AddForm from "./AddForm";

const Admins = () => {
	const { user } = useLoginStore();
	const { data, refetch } = useAdmins();
	const { doDeleteAdmin } = useDeleteAdmin(refetch);

	return (
		<div className="flex flex-col p-3">
			<div className="flex self-end pb-3">
				<AddForm type="admin" />
			</div>
			<div>
				<Table className="shadow-lg">
					<TableCaption>Registered Admins.</TableCaption>
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
						{data
							?.filter((admin: TAdmin) => admin._id !== user?._id)
							?.map((admin: TAdmin) => (
								<TableRow key={admin._id}>
									<TableCell>{admin.username}</TableCell>
									<TableCell>{admin.email}</TableCell>
									{/* <TableCell>{admin.password}</TableCell> */}
									<TableCell className="cursor-pointer hover:text-red-600 w-1">
										<AreYouSure
											title="Are you sure you want to delete this admin?"
											description="This action is irreversible"
											onConfirm={() => {
												doDeleteAdmin(admin._id);
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

export default Admins;
