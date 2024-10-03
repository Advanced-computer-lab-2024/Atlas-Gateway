import { LogOut } from "lucide-react";
import { useState } from "react";

interface Props {
	selectedCategory: string;
	onSelect: (item: string) => void;
}

const Navbar = ({ selectedCategory, onSelect }: Props) => {
	const [activeItem, setActiveItem] = useState("");
	const handleClick = (item: string) => {
		setActiveItem(item);
		onSelect(item);
	};
	const renderOptions = () => {
		switch (selectedCategory) {
			case "Accounts":
				return (
					<div className="flex gap-11 ml-auto mr-auto">
						{[
							"Admins",
							"Tourists",
							"Tour Guides",
							"Advertisers",
							"Governors",
							"Seller",
						].map((item) => (
							<p
								className={`cursor-pointer ${activeItem === item ? "text-[#2b58ed]" : ""}`}
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
						{["Inventory"].map((item) => (
							<p
								className={`cursor-pointer ${activeItem === item ? "text-[#2b58ed]" : ""}`}
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
						{["Show Tags"].map((item) => (
							<p
								className={`cursor-pointer ${activeItem === item ? "text-[#2b58ed]" : ""}`}
								onClick={() => handleClick(item)}
							>
								{item}
							</p>
						))}
					</div>
				);
			case "Activities":
				return (
					<div className="flex gap-11 ml-auto mr-auto">
						{["Avaliable Activities"].map((item) => (
							<p
								className={`cursor-pointer ${activeItem === item ? "text-[#2b58ed]" : ""}`}
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
				<LogOut className="cursor-pointer mr-5 hover:text-[#2b58ed]" />
			</div>
		</div>
	);
};

export default Navbar;
