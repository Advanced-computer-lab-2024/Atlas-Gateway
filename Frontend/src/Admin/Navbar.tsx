import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { onLogout } from "@/store/loginStore";

interface Props {
	selectedCategory: string;
	onSelect: (item: string) => void;
	selectedItem: string;
}

const Navbar = ({ selectedCategory, onSelect, selectedItem }: Props) => {
	const navigate = useNavigate();
	const logOut = () => {
		onLogout();
		navigate("/register");
	};
	const handleClick = (item: string) => {
		selectedItem = item;
		onSelect(item);
	};

	const renderOptions = () => {
		switch (selectedCategory) {
			case "Accounts":
				return (
					<div className="flex gap-11 ml-auto mr-auto">
						{[
							"Admins",
							"Governors",
							"Advertisers",
							"Tourists",
							"Tour Guides",
							"Seller",
						].map((item) => (
							<p
								className={`cursor-pointer ${selectedItem === item ? "text-[#2b58ed]" : ""}`}
								onClick={() => handleClick(item)}
							>
								{item}
							</p>
						))}
					</div>
				);
			case "Products":
				return (
					<div className="flex gap-11 ml-auto mr-auto">
						{["Products"].map((item) => (
							<p // maybe add here more later
								className={`cursor-pointer ${selectedItem === item ? "text-[#2b58ed]" : ""}`}
								onClick={() => handleClick(item)}
							>
								{item}
							</p>
						))}
					</div>
				);
			case "Tags":
				return (
					<div className="flex gap-11 ml-auto mr-auto">
						{["Preference Tags"].map((item) => (
							<p
								className={`cursor-pointer ${selectedItem === item ? "text-[#2b58ed]" : ""}`}
								onClick={() => handleClick(item)}
							>
								{item}
							</p>
						))}
					</div>
				);
			case "Activity Category":
				return (
					<div className="flex gap-11 ml-auto mr-auto">
						{["Activity Category"].map((item) => (
							<p
								className={`cursor-pointer ${selectedItem === item ? "text-[#2b58ed]" : ""}`}
								onClick={() => handleClick(item)}
							>
								{item}
							</p>
						))}
					</div>
				);
			case "Complaints":
				return (
					<div className="flex gap-11 ml-auto mr-auto">
						{["Tourist Complaints"].map((item) => (
							<p
								className={`cursor-pointer ${selectedItem === item ? "text-[#2b58ed]" : ""}`}
								onClick={() => handleClick(item)}
							>
								{item}
							</p>
						))}
					</div>
				);
			default:
				return <div className="flex gap-11 ml-auto mr-auto"></div>;
		}
	};

	return (
		<div className="bg-[#fefefe] w-full h-[80px] flex items-center">
			{renderOptions()}
			<div>
				<LogOut
					className="cursor-pointer mr-5 hover:text-[#2b58ed]"
					onClick={logOut}
				/>
			</div>
		</div>
	);
};

export default Navbar;
