import { useTouristProfile } from "@/api/data/useProfile";
import Label from "@/components/ui/Label";
import { Flex } from "@/components/ui/flex";

import PreferredTags from "./PreferredTags/PreferredTags";

export default function Account() {
	const { data } = useTouristProfile();

	return (
		<Flex className="grid grid-cols-2 gap-4">
			<Flex isColumn gap="3">
				<Label.Big400 className="text-center">
					Account Details
				</Label.Big400>
				<Flex isColumn gap="2">
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
						<Label.Mid500>
							{data?.address ?? "No address added yet!"}
						</Label.Mid500>
					</Flex>
				</Flex>
			</Flex>
			<Flex isColumn gap="3">
				<Label.Big400 className="text-center">
					Account Settings
				</Label.Big400>
				<Flex isColumn gap="2">
					<Flex gap="2" isColumn>
						<Label.Thin300>Preferred Tags</Label.Thin300>
						<PreferredTags />
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
}
