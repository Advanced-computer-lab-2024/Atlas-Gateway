import { Outlet } from "react-router-dom";

import { Flex } from "@/components/ui/flex";

import Navbar from "./Navbar";

export default function Layout() {
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
				}}
			>
				<Outlet />
			</Flex>
		</>
	);
}
