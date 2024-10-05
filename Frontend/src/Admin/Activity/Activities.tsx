import axios from "axios";
import { ActivityIcon, Pencil, RotateCw, Trash } from "lucide-react";
import { useEffect, useState } from "react";

interface Category {
	_id: string;
	name: string;
}

interface Activity {
	_id: string;
	description: string;
	dateTime: Date;
	location: string;
	tags: string;
	category: Category;
	minPrice: number;
	maxPrice: number;
	specialDiscounts: number;
	isOpen: boolean;
}
// this page is unused for now
const ActivityComponent = () => {
	const [activities, setActivities] = useState<Activity[]>([]);
	const [refresh, setRefresh] = useState<boolean>(false);

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/activity/list")
			.then((res) => {
				setActivities(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [refresh]);

	return (
		<div className="flex flex-col p-3 h-screen overflow-y-auto pb-32">
			<div className="flex gap-3 self-end pb-3">
				<div className="cursor-pointer hover:text-[#2b58ed]">
					<RotateCw onClick={() => setRefresh(!refresh)} />
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{activities.map((activity) => (
					<div
						key={activity._id}
						className="relative flex flex-col p-4 bg-white shadow-lg rounded-lg"
					>
						<div className="w-full h-40 flex justify-center items-center bg-gray-100 rounded-md">
							<ActivityIcon className="w-16 h-16 text-gray-400" />
						</div>
						<h2 className="text-lg font-semibold mt-2">
							{activity.description}
						</h2>
						<h3>{activity.location}</h3>
						<h3 className="flex justify-center">
							{new Date(activity.dateTime).toLocaleString()}
						</h3>
						<div className="flex justify-between">
							<h3>
								Price: ${activity.minPrice} - $
								{activity.maxPrice}
							</h3>
							<h3>Discount: {activity.specialDiscounts}%</h3>
						</div>
						<h3>Status: {activity.isOpen ? "Open" : "Closed"}</h3>
						<div className="flex justify-between">
							<h3>{activity.category.name}</h3>
							<div className="flex gap-3">
								<button className="bg-blue-500 text-white rounded-full p-2 shadow-lg hover:bg-blue-600">
									<Pencil className="w-3 h-3" />
								</button>
								<button className="bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600">
									<Trash
										className="w-3 h-3"
										// onClick={() => {
										// 	handleDelete(admin._id);
										// }}
									/>
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ActivityComponent;
