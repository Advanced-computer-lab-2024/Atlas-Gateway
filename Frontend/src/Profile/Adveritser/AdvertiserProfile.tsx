import { Camera, Image, Settings } from "lucide-react";
import { useEffect, useState } from "react";

import AdvertiserReport from "@/Reports/Advertiser/AdvertiserReport";
import { useDownload } from "@/api/data/useMedia";
import {
	useAdvertiserProfile,
	useForgetPassword,
	useRequestDeleteAdvertiserProfile,
} from "@/api/data/useProfile";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoginStore } from "@/store/loginStore";

import profile_background from "../../assets/profile_background.jpg";
import ChangePasswordSheet from "../ChangePasswordSheet";
import UploadForm from "../UploadForm";
import AdvertiserSheet from "./AdvertiserSheet";

const General = () => {
	const { user } = useLoginStore();
	const { data, refetch } = useAdvertiserProfile();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isDrawerOpen2, setIsDrawerOpen2] = useState(false);
	const [isDrawerOpen3, setIsDrawerOpen3] = useState(false);
	const [isDrawerOpen4, setIsDrawerOpen4] = useState(false);
	const { doForgetPassword } = useForgetPassword((response) => {
		setOtp(response.data);
	});
	const [profilePic, setProfilePic] = useState("");
	const { doDownload } = useDownload((response) => {
		setProfilePic(response.data);
	});
	const { doRequestDeleteAdvertiserProfile } =
		useRequestDeleteAdvertiserProfile(() => {});

	useEffect(() => {
		if (data?.imagePath) {
			doDownload(data?.imagePath);
		}
	}, [data?.imagePath, doDownload]);

	return (
		<div className="overflow-y-auto">
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
							className="object-contain w-full h-full"
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
					<h1 className="text-xl">
						{data?.name || "Name not found"}
					</h1>
					<h2 className="text-2xl">
						#{data?.username || "username not found"}
					</h2>
				</div>
				<div className="border-solid border-2 border-[rgb(44,44,44)] flex items-center mr-7 p-2 h-10">
					{data?.isVerified && (
						<div className="p-1">
							<AdvertiserSheet />
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
								Upload taxation card
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									if (data?._id)
										doRequestDeleteAdvertiserProfile(
											data?._id,
										);
								}}
								className="cursor-pointer"
							>
								Delete Account
							</DropdownMenuItem>

							<DropdownMenuItem
								onClick={() => {
									setIsDrawerOpen5(true);
									doForgetPassword(data?.email || "");
								}}
								className="cursor-pointer"
							>
								forget password?
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<div className="flex ml-10 mr-10 mt-10">
				<Tabs defaultValue="account" className="w-full">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="account">Account</TabsTrigger>
						<TabsTrigger value="reports">Reports</TabsTrigger>
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
								Hotline: {data?.hotline || "hotline not found"}
							</h3>
							<h3 className="text-xl">
								Company Profile:{" "}
								{data?.description || "Description here"}
							</h3>
						</div>
					</TabsContent>
					<TabsContent value="reports">
						<AdvertiserReport />
					</TabsContent>
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
				fileType={"image"}
				isDrawerOpen={isDrawerOpen4}
				setIsDrawerOpen={setIsDrawerOpen4}
				onUploadSuccess={() => {
					refetch();
					if (data?.imagePath) {
						doDownload(data?.imagePath);
					}
				}}
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
				fileType={"taxCard"}
				isDrawerOpen={isDrawerOpen3}
				setIsDrawerOpen={setIsDrawerOpen3}
			/>
		</div>
	);
};

export default General;
