import {
	ActivityIcon,
	ChartNoAxesCombined,
	MessageCircleWarning,
	Package,
	Percent,
	TagIcon,
	UserCircleIcon,
	Users,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useLoginStore } from "@/store/loginStore";

import ChangePasswordSheet from "../Profile/ChangePasswordSheet";

const Sidebar = () => {
	const { user } = useLoginStore();
	const navigate = useNavigate();
	const location = useLocation();
	const activeCategory = location.pathname.split("/")[2];

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const handleClick = (item: string) => {
		navigate(`/admin/${item.toLowerCase().replace(" ", "-")}`);
	};

	return (
		<div className="flex flex-col items-center w-60 h-full bg-[#2b58ad] text-center p-4 space-y-4 gap-3">
			<div className="flex flex-col gap-4 items-center">
				<div>
					<Link
						to={"/"}
						className="text-primary hover:no-underline hover:text-primary text-lg text-white font-[pacifico]"
					>
						AtlasGateway
					</Link>
					<UserCircleIcon
						className="p-1 rounded-full text-white"
						width={120}
						height={120}
					/>
				</div>
				<h3 className="text-[whitesmoke] text-lg font-semibold">
					{user?.username}
				</h3>
				<button
					onClick={() => {
						setIsDrawerOpen(true);
					}}
					className="bg-[#2b58ad] text-white py-2 px-4 rounded-lg border-white"
				>
					Change Password
				</button>
			</div>

			<div className="flex flex-col gap-4 overflow-y-auto">
				{[
					"Accounts",
					"Products",
					"Activity Category",
					"Tags",
					"Complaints",
					"Reports",
					"Promo Codes",
				].map((category) => (
					<div
						key={category}
						className={`flex flex-col items-center w-60 p-2 cursor-pointer hover:border-l-4 ${
							activeCategory ===
							category.toLowerCase().split(" ").join("-")
								? "bg-[#1e4b9d]"
								: ""
						}`}
						onClick={() => handleClick(category)}
					>
						{category === "Accounts" && (
							<Users
								className="text-white p-1 rounded-full"
								width={50}
								height={50}
							/>
						)}
						{category === "Products" && (
							<Package
								className="text-white p-1 rounded-full"
								width={50}
								height={50}
							/>
						)}
						{category === "Activity Category" && (
							<ActivityIcon
								className="text-white p-1 rounded-full"
								width={50}
								height={50}
							/>
						)}
						{category === "Tags" && (
							<TagIcon
								className="text-white p-1 rounded-full"
								width={50}
								height={50}
							/>
						)}
						{category === "Complaints" && (
							<MessageCircleWarning
								className="text-white p-1 rounded-full"
								width={50}
								height={50}
							/>
						)}
						{category === "Reports" && (
							<ChartNoAxesCombined
								className="text-white p-1 rounded-full"
								width={50}
								height={50}
							/>
						)}
						{category === "Promo Codes" && (
							<Percent
								className="text-white p-1 rounded-full"
								width={50}
								height={50}
							/>
						)}
						<p className="text-[whitesmoke]">{category}</p>
					</div>
				))}
			</div>
			<ChangePasswordSheet
				isDrawerOpen={isDrawerOpen}
				setIsDrawerOpen={setIsDrawerOpen}
			/>
		</div>
	);
};
export default Sidebar;
