import { LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { onLogout } from "@/store/loginStore";
import { useUserStatistics } from "@/api/data/useUserStatistics";

const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const activeCategory = location.pathname.split("/")[2];
	const activeItem = location.pathname.split("/")[3];
	//Using the custom hook to get user statistics
	const { data, isLoading, isError } = useUserStatistics();
	// Testing the numbers 
	// const isLoading = false;
	// const isError = false;
	// const data = {total : 50, newTotal :15};
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
		{/* Show total and new total if the data is available */}
		{activeCategory === "accounts" && (
        <div className="flex items-center gap-4 ml-4">
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error fetching users statistics.</p>}
          {data && (
            <>
              <span>Total Users: {data.total}</span>
              <span>New Users: {data.newTotal}</span>
            </>
          )}
        </div>
      )}
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
