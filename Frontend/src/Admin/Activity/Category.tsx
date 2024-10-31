import { RotateCw, Trash } from "lucide-react";

import { useCategories, useDeleteCategory } from "@/api/data/useCategories";
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
									<button className="bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600">
										<Trash
											className="w-4 h-4"
											onClick={() => {
												doDeleteCategory(category._id);
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

export default ActivityCategory;
