import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";

export default function Layout() {
	return (
		<div className="w-screen h-screen">
			<Navbar />
			<Outlet />
		</div>
	);
}
