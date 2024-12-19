import { Outlet, useLocation } from "react-router-dom";

import { Flex } from "@/components/ui/flex";

import background from "../assets/background.png";
import Navbar from "./Navbar";

export default function Layout() {
	const location = useLocation();

	const isOnHome = location.pathname === "/";

	return (
		<>
			<Navbar />
			<Flex
				className="overflow-y-scroll"
				style={{
					width: "100%",
					height: "100%",
					paddingRight: "5%",
					paddingLeft: "5%",
					backgroundImage: isOnHome ? `url(${background})` : "",
					backgroundSize: "cover",
				}}
			>
				<Outlet />
			</Flex>
		</>
	);
}
