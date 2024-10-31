import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Bell, Camera, EllipsisVertical, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import profile_background from "../assets/profile_background.jpg";

const Navbar = () => {
	return (
		<div>
			<div className="flex justify-between p-4 bg-cyan-200">
				<div>
					<Link
						to={"/"}
						className="text-primary hover:no-underline hover:text-primary text-lg text-white font-[pacifico]"
					>
						AtlasGateway
					</Link>
				</div>
				<div className="flex p-4">
					<Bell />
					<LogOut className="ml-4" />
				</div>
			</div>

			<div className="relative w-full">
				<div
					className="w-full h-48 md:h-64 bg-cover bg-center"
					style={{ backgroundImage: `url(${profile_background})` }}
				>
					<button className="flex absolute bottom-4 right-4 mr-7 bg-orange-500 text-white px-4 py-1 rounded-lg hover:bg-orange-600">
						<Camera />
						<h2 className="ml-2">Upload Cover Photo</h2>
					</button>
				</div>

				<div className="absolute left-36 -bottom-16 w-48 h-48 rounded-full overflow-hidden border-4 border-white">
					<img
						src={profile_background}
						alt="Profile"
						className="object-cover w-full h-full"
					/>
				</div>
			</div>

			<div className="flex justify-between ml-96 mt-8 pr-10">
				<div>
					<h1 className="text-2xl">Mohamad Rageh</h1>
					<p className="text-xl text-gray-500">tanta</p>
					<p className="text-xl text-yellow-500">404 PTS</p>
				</div>
				<div className="mr-7">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<EllipsisVertical className="cursor-pointer" />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>Update Profile</DropdownMenuItem>
							<DropdownMenuItem>Update Profile</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<div className="flex ml-10 mr-10 mt-10">
				<Tabs defaultValue="account" className="w-full">
					<TabsList className="grid w-full grid-cols-4">
						<TabsTrigger value="account">Account</TabsTrigger>
						<TabsTrigger value="password">Password</TabsTrigger>
						<TabsTrigger value="upcoming">Upcoming</TabsTrigger>
						<TabsTrigger value="history">History</TabsTrigger>
					</TabsList>
					<TabsContent value="account"></TabsContent>
					<TabsContent value="password"></TabsContent>
					<TabsContent value="Upcoming"></TabsContent>
					<TabsContent value="History"></TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default Navbar;
