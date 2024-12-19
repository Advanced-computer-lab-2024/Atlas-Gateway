import { PropsWithChildren } from "react";

import { Flex } from "@/components/ui/flex";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }: PropsWithChildren) {
	return (
		<Flex className=" h-full bg-[#ebedf1]">
			<Sidebar />
			<Flex isColumn className="h-full w-full">
				<Navbar />
				<Flex isColumn className="p-4 w-full h-full">
					{children}
				</Flex>
			</Flex>
		</Flex>
	);
}
