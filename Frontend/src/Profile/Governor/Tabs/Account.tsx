import { CreditCard, Edit, IdCard, Lock, X } from "lucide-react";
import { useState } from "react";

import ChangePasswordSheet from "@/Profile/ChangePasswordSheet";
import UploadForm from "@/Profile/UploadForm";
import { useDownload } from "@/api/data/useMedia";
import { useGovernorProfile } from "@/api/data/useProfile";
import Label from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import { useLoginStore } from "@/store/loginStore";

import GovernerSheet from "../GovernorSheet";

export default function Account() {
	const { user } = useLoginStore();
	const { data, refetch } = useGovernorProfile();
	const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isDrawerOpen2, setIsDrawerOpen2] = useState(false);
	const [isDrawerOpen3, setIsDrawerOpen3] = useState(false);
	const [isDrawerOpen4, setIsDrawerOpen4] = useState(false);

	const { doDownload } = useDownload(() => {});

	return (
		<Flex className="grid grid-cols-2 gap-4">
			<Flex isColumn gap="3" className="border-r border-black">
				<Label.Big400 className="text-center">
					Account Details
				</Label.Big400>
				<Flex isColumn gap="2">
					{data?.name && (
						<Flex gap="2" isColumn>
							<Label.Thin300>Name</Label.Thin300>
							<Label.Mid500>{data?.name}</Label.Mid500>
						</Flex>
					)}
					<Flex gap="2" isColumn>
						<Label.Thin300>Username</Label.Thin300>
						<Label.Mid500>{data?.username}</Label.Mid500>
					</Flex>
					<Flex gap="2" isColumn>
						<Label.Thin300>Email</Label.Thin300>
						<Label.Mid500>{data?.email}</Label.Mid500>
					</Flex>
				</Flex>
			</Flex>
			<Flex isColumn gap="3">
				<Label.Big400 className="text-center">
					Account Settings
				</Label.Big400>
				<Flex isColumn gap="2" justify="center" align="center">
					<Label.Mid300>Actions</Label.Mid300>
					<Flex
						gap="2"
						isWrapped
						className="w-full"
						justify="center"
						align="center"
					>
						<Button
							variant="default"
							className="gap-2"
							size="default"
							onClick={() => {
								setIsDrawerOpen2(true);
							}}
						>
							<IdCard /> Upload ID
						</Button>
						<Button
							variant="default"
							className="gap-2"
							size="default"
							onClick={() => {
								setIsDrawerOpen2(true);
							}}
						>
							<CreditCard /> Upload Taxation Card
						</Button>
						<Button
							variant="default"
							className="gap-2"
							size="default"
							onClick={() => {
								setIsDrawerOpen(true);
							}}
						>
							<Lock />
							Change password
						</Button>
						{data?.isVerified && (
							<Button
								variant="default"
								className="gap-2"
								size="default"
								onClick={() => {
									setIsEditDrawerOpen(true);
								}}
							>
								<Edit />
								Edit account
							</Button>
						)}
					</Flex>
				</Flex>
			</Flex>
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
				fileType={"taxCard"}
				isDrawerOpen={isDrawerOpen3}
				setIsDrawerOpen={setIsDrawerOpen3}
			/>
			<GovernerSheet
				open={isEditDrawerOpen}
				setOpen={setIsEditDrawerOpen}
			/>
		</Flex>
	);
}
