import { RotateCw, Trash } from "lucide-react";

import { useCategories, useDeleteCategory } from "@/api/data/useCategories";
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

import TagAndCategoryForm from "./CategoryAndTagsForm";
import EditForm from "./EditForm";

const ActivityCategory = () => {
	const { data, refetch } = useCategories();
	const { doDeleteCategory } = useDeleteCategory(refetch);
	return (
		<div className="flex flex-col p-3">
			<div className="flex self-end pb-3">
				<TagAndCategoryForm type="category" />
			</div>
			<div>
				<Table className="shadow-lg">
					<TableCaption>Avaliable Categories.</TableCaption>
					<TableHeader className="bg-gray-100">
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead></TableHead>
							<TableHead className="cursor-pointer hover:text-[#2b58ed] w-1">
								<RotateCw onClick={() => refetch()} />
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data?.map((category) => (
							<TableRow key={category._id}>
								<TableCell className="p-3">
									{category.name}
								</TableCell>
								<TableCell className="w-1">
									<EditForm
										type="category"
										id={category._id}
									/>
								</TableCell>
								<TableCell className="cursor-pointer hover:text-red-600 w-1">
									<AreYouSure
										title="Are you sure you want to delete this category?"
										description="This action is irreversible"
										onConfirm={() => {
											if (category._id) {
												doDeleteCategory(category._id);
											}
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

export default ActivityCategory;
