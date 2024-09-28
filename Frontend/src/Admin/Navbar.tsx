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
							// we can add in the array choices we want for Accounts
							"Admins",
							"Tourists",
							"Tour Guides",
							"Advertisers",
						].map((item) => (
							<p
								key={item}
								className={`text-black cursor-pointer ${activeItem === item ? "text-[#2b58ed]" : ""}`}
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
						{["Inventory"].map(
							(
								item, // we can add in the array choices we want for products
							) => (
								<p
									className={`text-black cursor-pointer ${activeItem === item ? "text-[#2b58ed]" : ""}`}
									onClick={() => handleClick(item)}
								>
									{item}
								</p>
							),
						)}
					</div>
				);
			case "Tags":
				return (
					<div className="flex gap-11 ml-auto mr-auto">
						{["Show Tags"].map(
							// we can add in the array choices we want for Tags
							(item) => (
								<p
									className={`text-black cursor-pointer ${activeItem === item ? "text-[#2b58ed]" : ""}`}
									onClick={() => handleClick(item)}
								>
									{item}
								</p>
							),
						)}
					</div>
				);
			case "Activities":
				return (
					<div className="flex gap-11 ml-auto mr-auto">
						{["Avaliable Activities"].map(
							// we can add in the array choices we want for Activities
							(item) => (
								<p
									className={`text-black cursor-pointer ${activeItem === item ? "text-[#2b58ed]" : ""}`}
									onClick={() => handleClick(item)}
								>
									{item}
								</p>
							),
						)}
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
					className="rounded-full text-black mr-5 cursor-pointer"
					width={30}
					height={30}
				/>
			</div>
		</div>
	);
};

export default Navbar;
