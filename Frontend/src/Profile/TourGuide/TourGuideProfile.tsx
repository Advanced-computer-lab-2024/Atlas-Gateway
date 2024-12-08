import axios from "axios";
import { Image } from "lucide-react";
import { useEffect, useState } from "react";

import { useDownload } from "@/api/data/useMedia";
import { useTourGuideProfile } from "@/api/data/useProfile";
import { CommentsContainer } from "@/components/ui/comments";
import { Flex } from "@/components/ui/flex";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoginStore } from "@/store/loginStore";
import { TReview } from "@/types/global";

import profile_background from "../../assets/profile_background.jpg";
import UploadForm from "../UploadForm";
import Account from "./tabs/Account";
import Reports from "./tabs/Reports";

export default function TourGuideProfile() {
	const { user } = useLoginStore();
	const { data, refetch } = useTourGuideProfile();
	const [isDrawerOpen4, setIsDrawerOpen4] = useState(false);
	const [profilePic, setProfilePic] = useState("");
	const { doDownload } = useDownload((response) => {
		setProfilePic(response.data);
	});
	useEffect(() => {
		if (data?.imagePath) {
			doDownload(data?.imagePath);
		}
	}, [data?.imagePath, doDownload]);

	const [fetchedReviews, setFetchedReviews] = useState<TReview[]>([]);
	const [moreCommentsAvailable, setMoreCommentsAvailable] = useState(true);

	const fetchReviews = async () => {
		await axios
			.get("http://localhost:5000/api/reviews/list", {
				params: {
					tourGuideId: data?._id,
					skipCount: fetchedReviews.length,
				},
			})
			.then((res) => {
				setFetchedReviews([...fetchedReviews, ...res.data]);
				if (res.data.length < 10) {
					setMoreCommentsAvailable(false);
				}
			});
	};

	useEffect(() => {
		fetchReviews();
	}, []);

	return (
		<Flex isColumn className="w-full">
			<div className="relative w-full">
				<div
					className="w-full h-64 bg-cover bg-center rounded-lg"
					style={{
						backgroundImage: `url(${profile_background})`,
					}}
				/>
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
			<Tabs defaultValue="account" className="w-full">
				<Flex isColumn gap="5" className="overflow-y-scroll">
					<Flex className="ml-96 mt-2">
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="account">Account</TabsTrigger>
							<TabsTrigger value="reports">Reports</TabsTrigger>
							<TabsTrigger value="reviews">Reviews</TabsTrigger>
						</TabsList>
					</Flex>
					<Flex
						isColumn
						className="px-4 w-full border border-black p-3 rounded-lg min-h-[500px] overflow-y-scroll"
					>
						<TabsContent
							className="flex justify-between items-center"
							value="account"
						>
							<Account />
						</TabsContent>
						<TabsContent value="reports">
							<Reports />
						</TabsContent>
						<TabsContent value="reviews">
							<CommentsContainer
								comments={fetchedReviews}
								showMore={() => fetchReviews()}
								moreAvailable={moreCommentsAvailable}
							/>
						</TabsContent>
					</Flex>
				</Flex>
			</Tabs>
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
		</Flex>
	);
}
