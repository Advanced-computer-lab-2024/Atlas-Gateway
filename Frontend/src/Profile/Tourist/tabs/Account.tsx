import { Edit, Lock, TicketCheck, X } from "lucide-react";
import { useState } from "react";

import ChangePasswordSheet from "@/Profile/ChangePasswordSheet";
import {
	useRedeemTouristLoyaltyPoints,
	useRequestDeleteTouristProfile,
	useTouristProfile,
} from "@/api/data/useProfile";
import AreYouSure from "@/components/ui/AreYouSure";
import Label from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import useCurrency from "@/hooks/useCurrency";

import TouristSheet from "../TouristSheet";
import PreferredTags from "./PreferredTags/PreferredTags";

export default function Account() {
	const { data, refetch } = useTouristProfile();
	const convertCurrency = useCurrency();
	const [isChangePasswordDrawerOpen, setIsChangePasswordDrawerOpen] =
		useState(false);
	const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
	const { doRequestDeleteTouristProfile } = useRequestDeleteTouristProfile(
		() => {},
	);
	const { doRedeemTouristLoyaltyPoints } =
		useRedeemTouristLoyaltyPoints(refetch);

	return (
		<Flex className="grid grid-cols-2 gap-4">
			<Flex isColumn gap="3" className="w-full border-r border-black ">
				<Label.Big400 className="text-center">
					Account Details
				</Label.Big400>
				<Flex className="grid grid-cols-2">
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
						<Flex gap="2" isColumn>
							<Label.Thin300>Mobile</Label.Thin300>
							<Label.Mid500>{data?.mobile}</Label.Mid500>
						</Flex>
						<Flex gap="2" isColumn>
							<Label.Thin300>Address</Label.Thin300>
							<Flex gap="1" isColumn>
								{data?.address?.map((line) => (
									<Label.Mid500 key={line}>
										{line}
									</Label.Mid500>
								))}
							</Flex>
						</Flex>
					</Flex>
					<Flex isColumn gap="2">
						<Flex gap="2" isColumn>
							<Label.Thin300>Points</Label.Thin300>
							<Label.Mid500>
								{data?.loyaltyPoints}
								{" Points"}
							</Label.Mid500>
						</Flex>
						<Flex gap="2" isColumn>
							<Label.Thin300>Wallet Balance</Label.Thin300>
							<Label.Mid500>
								{convertCurrency(data?.walletBalance)}
							</Label.Mid500>
						</Flex>
						<Flex gap="2" isColumn>
							<Label.Thin300>Currency</Label.Thin300>
							<Label.Mid500>{data?.currency}</Label.Mid500>
						</Flex>
						<Flex gap="2" isColumn>
							<Label.Thin300>Nationality</Label.Thin300>
							<Label.Mid500>{data?.nationality}</Label.Mid500>
						</Flex>
						<Flex gap="2" isColumn>
							<Label.Thin300>Occupation</Label.Thin300>
							<Label.Mid500>{data?.occupation}</Label.Mid500>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
			<Flex isColumn gap="3" className="w-full">
				<Label.Big400 className="text-center">
					Account Settings
				</Label.Big400>
				<Flex isColumn gap="5" className="w-full">
					<Flex
						isColumn
						gap="2"
						className="w-full"
						justify="center"
						align="center"
					>
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
									if (data?._id)
										doRedeemTouristLoyaltyPoints(data?._id);
								}}
							>
								<TicketCheck /> Redeem Loyalty Points
							</Button>
							<Button
								variant="default"
								className="gap-2"
								size="default"
								onClick={() => {
									setIsChangePasswordDrawerOpen(true);
								}}
							>
								<Lock />
								Change password
							</Button>
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
							<AreYouSure
								title="Are you sure you want to sent a request to delete your account?"
								description="This action is irreversible"
								onConfirm={() => {
									if (data?._id)
										doRequestDeleteTouristProfile(data._id);
								}}
							>
								<Button
									variant="destructive"
									className="gap-2"
									size="default"
								>
									<X />
									Delete Account
								</Button>
							</AreYouSure>
						</Flex>
					</Flex>
					<Flex isColumn gap="2" className="w-full" align="center">
						<Label.Mid300>Preferred Tags</Label.Mid300>
						<PreferredTags />
					</Flex>
				</Flex>
			</Flex>
			<ChangePasswordSheet
				isDrawerOpen={isChangePasswordDrawerOpen}
				setIsDrawerOpen={setIsChangePasswordDrawerOpen}
			/>
			<TouristSheet
				open={isEditDrawerOpen}
				setOpen={setIsEditDrawerOpen}
			/>
		</Flex>
	);
}
