import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import { Camera, Image, Settings } from "lucide-react";
import { useEffect, useState } from "react";

import { useTourGuideProfile } from "@/api/data/useProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoginStore } from "@/store/loginStore";

import profile_background from "../assets/profile_background.jpg";
import ChangePasswordSheet from "./ChangePasswordSheet";
import TourGuideSheet from "./TourGuideSheet";
import UploadForm from "./UploadForm";

export default function TourGuideProfile() {
	const { user } = useLoginStore();
	const { data } = useTourGuideProfile();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isDrawerOpen2, setIsDrawerOpen2] = useState(false);
	const [isDrawerOpen3, setIsDrawerOpen3] = useState(false);
	const [isDrawerOpen4, setIsDrawerOpen4] = useState(false);
	const [profilePic, setProfilePic] = useState("");
	const handleDownload = async (filePath: string) => {
		axios
			.post(`http://localhost:5000/api/media/download`, { filePath })
			.then((res) => {
				setProfilePic(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	useEffect(() => {
		if (data?.imagePath) {
			handleDownload(data.imagePath);
		}
	}, [data?.imagePath]);
	return (
		<div>
			<div className="relative w-full">
				<div
					className="w-full h-48 md:h-64 bg-cover bg-center"
					style={{
						backgroundImage: `url(${profile_background})`,
					}}
				>
					<button className="flex absolute bottom-4 right-4 mr-7 bg-orange-500 text-white px-4 py-1 rounded-lg hover:bg-orange-600">
						<Camera />
						<h2 className="ml-2">Upload Cover Photo</h2>
					</button>
				</div>

				<button
					onClick={() => setIsDrawerOpen4(true)}
					className="absolute left-36 -bottom-16 w-48 h-48 rounded-full overflow-hidden border-4 border-white focus:outline-none group"
				>
					{profilePic == "" ? (
						<img
							src={profile_background}
							alt="Profile"
							className="object-cover w-full h-full"
						/>
					) : (
						<img
							src={profilePic}
							alt="Profile"
							className="object-cover w-full h-full"
						/>
					)}
					<div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						<div className="flex flex-col justify-center items-center">
							<Image className="text-white opacity-70 w-16 h-16" />
							<p className="text-white">Change profile photo</p>
						</div>
					</div>
				</button>
			</div>

			<div className="flex justify-between ml-96 mt-8 pr-10">
				<div>
					<h1 className="text-2xl">
						{data?.name || "Name not found"}
					</h1>
					<h2 className="text-xl">
						#{data?.username || "username not found"}
					</h2>
				</div>
				<div className="border-solid border-2 border-[rgb(44,44,44)] flex items-center mr-7 p-2 h-10">
					{data?.isVerified && (
						<div className="p-1">
							<TourGuideSheet />
						</div>
					)}
					<DropdownMenu modal={false}>
						<DropdownMenuTrigger>
							<Settings className="cursor-pointer" />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem
								onClick={() => {
									setIsDrawerOpen(true);
								}}
								className="cursor-pointer"
							>
								change password
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									setIsDrawerOpen2(true);
								}}
								className="cursor-pointer"
							>
								Upload Id
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									setIsDrawerOpen3(true);
								}}
								className="cursor-pointer"
							>
								Upload certificate
							</DropdownMenuItem>
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
					<TabsContent
						className="flex justify-between items-center"
						value="account"
					>
						<div>
							<h2 className="text-xl">
								{data?.email || "Email not found"}
							</h2>
							<h3 className="text-xl">
								mobile: {data?.mobile || "mobile here"}
							</h3>
							<h3 className="text-xl">
								experience:{" "}
								{data?.experience || "experience here"}
							</h3>
							<h3 className="text-xl">
								Company description:{" "}
								{data?.description || "Description here"}
							</h3>
							<h3 className="text-xl">
								prevWork: {data?.prevWork || "prevWork here"}
							</h3>
						</div>
					</TabsContent>
					<TabsContent value="password"></TabsContent>
					<TabsContent value="Upcoming"></TabsContent>
					<TabsContent value="History"></TabsContent>
				</Tabs>
			</div>
			<ChangePasswordSheet
				isDrawerOpen={isDrawerOpen}
				setIsDrawerOpen={setIsDrawerOpen}
			/>
			<UploadForm
				userType={user?.type}
				userId={user?._id}
				fileType={"id"}
				isDrawerOpen={isDrawerOpen2}
				setIsDrawerOpen={setIsDrawerOpen2}
			/>
			<UploadForm
				userType={user?.type}
				userId={user?._id}
				fileType={"certificate"}
				isDrawerOpen={isDrawerOpen3}
				setIsDrawerOpen={setIsDrawerOpen3}
			/>
			<UploadForm
				userType={user?.type}
				userId={user?._id}
				fileType={"image"}
				isDrawerOpen={isDrawerOpen4}
				setIsDrawerOpen={setIsDrawerOpen4}
			/>
		</div>
	);
}
