import { RotateCw, Trash } from "lucide-react";

import { useDeleteTag, useTags } from "@/api/data/useTags";
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

const Tags = () => {
	const { data, refetch } = useTags();
	const { doDeleteTag } = useDeleteTag(refetch);

	return (
		<div className="flex flex-col p-3">
			<div className="flex self-end pb-3">
				<TagAndCategoryForm type="tag" />
			</div>
			<div>
				<Table className="shadow-lg">
					<TableCaption>Avaliable Prefrence Tags.</TableCaption>
					<TableHeader className="bg-gray-100">
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Type</TableHead>
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
									{tag.name}
								</TableCell>
								<TableCell className="p-3">
									{tag.type}
								</TableCell>
								<TableCell className="w-1">
									<TableCell className="w-1">
										<EditForm
											type="tag"
											id={tag._id ?? ""}
										/>
									</TableCell>
								</TableCell>
								<TableCell className="cursor-pointer hover:text-red-600 w-1">
									<button className="bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600">
										<Trash
											className="w-4 h-4"
											onClick={() => {
												if (tag._id) {
													doDeleteTag(tag._id);
												}
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

export default Tags;
