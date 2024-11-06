import { useEffect, useState } from "react";

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
import Complaint from "./Complaint/Complaint";

const Admin = () => {
	const [selectedCategory, setSelectedCategory] = useState(""); // manages selection from sidebar
	const [selectedItem, setSelectedItem] = useState("Admins"); // manages selection from navbar
	useEffect(() => {
		switch (selectedCategory) {
			case "Accounts":
				setSelectedItem("Admins");
				break;
			case "Products":
				setSelectedItem("Products");
				break;
			case "Activity Category":
				setSelectedItem("Activity Category");
				break;
			case "Tags":
				setSelectedItem("Preference Tags");
				break;
			case "Complaints":
				setSelectedItem("Tourist Complaints");
				break;
		}
	}, [selectedCategory]);
	const renderContent = () => {
		console.log(selectedCategory);
		if (selectedCategory === "Accounts") {
			switch (selectedItem) {
				case "Tourists":
					return <Tourist />;
				case "Admins":
					return <Admins />;
				case "Tour Guides":
					return <TourGuide />;
				case "Advertisers":
					return <Advertisers />;
				case "Governors":
					return <Governor />;
				case "Seller":
					return <Seller />;
				default:
					return null;
			}
		} else if (selectedCategory === "Products") {
			if (selectedItem === "Products") return <Product />;
		} else if (selectedCategory === "Activity Category") {
			if (selectedItem === "Activity Category") return <Category />;
		} else if (selectedCategory === "Tags") {
			if (selectedItem === "Preference Tags") return <Tags />;
		}else if (selectedCategory === "Complaints") {
			if (selectedItem === "Tourist Complaints") return <Complaint />;
		}
		return null;
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
