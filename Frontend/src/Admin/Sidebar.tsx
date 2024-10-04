import {
	ActivityIcon,
	Package,
	TagIcon,
	UserCircleIcon,
	Users,
} from "lucide-react";
import { useState } from "react";

interface Props {
	onSelect: (item: string) => void;
}

const Sidebar = ({ onSelect }: Props) => {
	const [activeItem, setActiveItem] = useState("");

	const handleClick = (item: string) => {
		setActiveItem(item);
		onSelect(item);
	};

	return (
		<div className="flex flex-col items-center w-60 h-full bg-[#2b58ad] text-center p-4 space-y-4 gap-3">
			<div className="flex flex-col gap-3 items-center">
				<UserCircleIcon
					className="p-1 rounded-full text-white"
					width={120}
					height={120}
				/>
				<h3 className="text-[whitesmoke] text-lg font-semibold">
					Name
				</h3>
				<button className="bg-[#2b58ad] text-white py-2 px-4 rounded-lg border-white">
					Update Profile
				</button>
			</div>

			<div className="flex flex-col gap-4">
				{["Accounts", "Products", "Activity Category", "Tags"].map(
					(item) => (
						<div
							key={item}
							className={`flex flex-col items-center w-60 p-2 cursor-pointer hover:border-l-4 ${
								activeItem === item ? "bg-[#1e4b9d]" : ""
							}`}
							onClick={() => handleClick(item)}
						>
							{item === "Accounts" && (
								<Users
									className="text-white p-1 rounded-full"
									width={50}
									height={50}
								/>
							)}
							{item === "Products" && (
								<Package
									className="text-white p-1 rounded-full"
									width={50}
									height={50}
								/>
							)}
							{item === "Activity Category" && (
								<ActivityIcon
									className="text-white p-1 rounded-full"
									width={50}
									height={50}
								/>
							)}
							{item === "Tags" && (
								<TagIcon
									className="text-white p-1 rounded-full"
									width={50}
									height={50}
								/>
							)}
							<p className="text-[whitesmoke]">{item}</p>
						</div>
					),
				)}
			</div>
		</div>
	);
};
export default Sidebar;
