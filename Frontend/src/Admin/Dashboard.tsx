import { useState } from "react";

import Admins from "./Accounts/Admin";
import Advertisers from "./Accounts/Advertiser";
import Governor from "./Accounts/Governor";
import Seller from "./Accounts/Seller";
import TourGuide from "./Accounts/TourGuide";
import Tourist from "./Accounts/Tourist";
import Category from "./Activity/Category";
import Tags from "./Activity/Tags";
import Navbar from "./Navbar";
import Product from "./Product/Product";
import Sidebar from "./Sidebar";

const Admin = () => {
	const [selectedCategory, setSelectedCategory] = useState(""); // manages selection from sidebar
	let [selectedItem, setSelectedItem] = useState(""); // manages selection from navbar
	switch (selectedCategory) {
		case "Accounts":
			selectedItem = "Admins";
			break;
		case "Products":
			selectedItem = "Products";
			break;
		case "Activity Category":
			selectedItem = "Activity Category";
			break;
		case "Tags":
			selectedItem = "Preference Tags";
			break;
	}
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
							<Category />
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
					selectedItem={selectedItem}
				/>
				<div className="p-4">{renderContent()}</div>
			</div>
		</div>
	);
};
export default Admin;
