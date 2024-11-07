import { LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { onLogout } from "@/store/loginStore";

const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const activeCategory = location.pathname.split("/")[2];
	const activeItem = location.pathname.split("/")[3];

	const logOut = () => {
		onLogout();
		navigate("/register");
	};

	const handleClick = (item: string) => {
		navigate(
			`/admin/${activeCategory}/${item.toLowerCase().replace(" ", "-")}`,
		);
	};

	const renderOptions = () => {
		switch (activeCategory) {
			case "accounts":
				return (
					<div className="flex gap-11 ml-auto mr-auto">
						{[
							"Admins",
							"Governors",
							"Advertisers",
							"Tourists",
							"Tour Guides",
							"Sellers",
						].map((item) => (
							<p
								className={`cursor-pointer ${activeItem === item.toLowerCase().replace(" ", "-") ? "text-[#2b58ed]" : ""}`}
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
		<div className="bg-[#fefefe] w-full min-h-20 max-h-20 flex items-center">
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
