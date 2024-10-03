import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Admins from "./users/Admin";
import Advertisers from "./users/Advertiser";
import Governor from "./users/Governor";
import Seller from "./users/Seller";
import TourGuide from "./users/TourGuide";
import Tourist from "./users/Tourist";

const Admin = () => {
	const [selectedCategory, setSelectedCategory] = useState(""); // manages selection from sidebar
	const [selectedItem, setSelectedItem] = useState(""); // manages selection from navbar

	const renderContent = () => {
		switch (selectedItem) {
			case "Tourists":
				if (selectedCategory == "Accounts") {
					return (
						<div>
							<Tourist />
						</div>
					);
				}
			case "Admins":
				if (selectedCategory == "Accounts") {
					return (
						<div>
							<Admins />
						</div>
					);
				}
			case "Tour Guides":
				if (selectedCategory == "Accounts") {
					return (
						<div>
							<TourGuide />
						</div>
					);
				}
			case "Advertisers":
				if (selectedCategory == "Accounts") {
					return (
						<div>
							<Advertisers />
						</div>
					);
				}
			case "Governors":
				if (selectedCategory == "Accounts") {
					return (
						<div>
							<Governor />
						</div>
					);
				}
			case "Seller":
				if (selectedCategory == "Accounts") {
					return (
						<div>
							<Seller />
						</div>
					);
				}
			default:
				return <div></div>;
		}
	};
	return (
		<div className="flex h-full bg-[#ebedf1]">
			<Sidebar onSelect={setSelectedCategory} />
			<div className="flex-1">
				<Navbar
					selectedCategory={selectedCategory}
					onSelect={setSelectedItem}
				/>
				<div className="p-4">{renderContent()}</div>
			</div>
		</div>
	);
};
export default Admin;
