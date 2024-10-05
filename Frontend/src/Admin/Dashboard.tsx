import { useState } from "react";

import Admins from "./Accounts/Admin";
import Advertisers from "./Accounts/Advertiser";
import Governor from "./Accounts/Governor";
import Seller from "./Accounts/Seller";
import TourGuide from "./Accounts/TourGuide";
import Tourist from "./Accounts/Tourist";
import Navbar from "./Navbar";
import Product from "./Products/Product";
import Sidebar from "./Sidebar";
import Activities from "./resources/Activities";
import ActivityCategory from "./resources/ActivityCategory";
import Tags from "./resources/Tags";

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
		if (selectedCategory == "Tags") {
			switch (selectedItem) {
				case "Preference Tags":
					return (
						<div>
							<Tags />
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
