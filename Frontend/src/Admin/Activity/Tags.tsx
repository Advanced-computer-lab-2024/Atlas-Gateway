import axios from "axios";
import { Pencil, RotateCw, Trash } from "lucide-react";
import { useEffect, useState } from "react";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import EditForm from "./EditForm";
import TagAndCategoryForm from "./TagAndCategoryForm";

interface Tags {
	_id: string;
	name: string;
	type: string;
}
const Tags = () => {
	const [prefrenceTags, setPrefrenceTags] = useState<Tags[]>([]);
	const [refresh, setRefresh] = useState<boolean>(false);

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/tags/preference/get")
			.then((res) => {
				setPrefrenceTags(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [refresh]);

	const handleDelete = (id: string) => {
		axios
			.delete(`http://localhost:5000/api/tags/preference/delete/${id}`)
			.then((res) => {
				setRefresh(!refresh);
			})
			.catch((error) => {
				console.log(error);
			});
	};

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
								<RotateCw
									onClick={() => setRefresh(!refresh)}
								/>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{prefrenceTags.map((tag) => (
							<TableRow key={tag._id}>
								<TableCell className="p-3">
									{tag.name}
								</TableCell>
								<TableCell className="p-3">
									{tag.type}
								</TableCell>
								<TableCell className="w-1">
									<TableCell className="w-1">
										<EditForm type="tag" id={tag._id} />
									</TableCell>
								</TableCell>
								<TableCell className="cursor-pointer hover:text-red-600 w-1">
									<button className="bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600">
										<Trash
											className="w-4 h-4"
											onClick={() => {
												handleDelete(tag._id);
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
