import { Outlet } from "react-router-dom";

import { Flex } from "@/components/ui/flex";

import Navbar from "./Navbar";

export default function Layout() {
	return (
		<>
			<Navbar />
			<Flex
				style={{
					width: "90%",
					marginInline: "5%",
				}}
			>
				<Outlet />
			</Flex>
		</>
	);
}
