import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Activities from "./resources/Activities";
import ActivityCategory from "./resources/ActivityCategory";
import Product from "./resources/Product";
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
		if (selectedCategory == "Accounts") {
			switch (selectedItem) {
				case "Tourists":
					return (
						<div>
							<Tourist />
						</div>
					);
				case "Admins":
					return (
						<div>
							<Admins />
						</div>
					);
				case "Tour Guides":
					return (
						<div>
							<TourGuide />
						</div>
					);
				case "Advertisers":
					return (
						<div>
							<Advertisers />
						</div>
					);
				case "Governors":
					return (
						<div>
							<Governor />
						</div>
					);
				case "Seller":
					return (
						<div>
							<Seller />
						</div>
					);
			}
		}
		if (selectedCategory == "Products") {
			switch (selectedItem) {
				case "Products":
					return (
						<div>
							<Product />
						</div>
					);
			}
		}
		if (selectedCategory == "Activity Category") {
			switch (selectedItem) {
				case "Activity Category":
					return (
						<div>
							<ActivityCategory />
						</div>
					);
			}
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
