import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Admin = () => {
	const [selectedCategory, setSelectedCategory] = useState(""); // manages selection from sidebar
	const [selectedItem, setSelectedItem] = useState(""); // manages selection from navbar

	const renderContent = () => {
		switch (selectedItem) {
			case "Tourists":
				return <div>Tourists Component</div>; // tourist component here
			case "Admins":
				return <div>Admins Component</div>; // admin component here
			case "Tour Guides":
				return <div>Tour Guides Component</div>; // tour guide component here
			case "Advertisers":
				return <div>Advertisers Component</div>; // advertiser component here
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
