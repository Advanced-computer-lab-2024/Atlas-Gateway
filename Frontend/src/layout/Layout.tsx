import { Outlet } from "react-router-dom";

import background from "../assets/background.png";
import Navbar from "./Navbar";

export default function Layout() {
	return (
		<div
			className="w-screen h-screen"
			style={{
				backgroundImage: `url(${background})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<Navbar />
			<Outlet />
		</div>
	);
}
