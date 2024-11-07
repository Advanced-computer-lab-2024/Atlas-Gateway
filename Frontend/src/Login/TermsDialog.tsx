import { useCallback } from "react";

import {
	useUpdateAdvertiserProfile,
	useUpdateSellerProfile,
	useUpdateTourGuideProfile,
} from "@/api/data/useProfile";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Flex } from "@/components/ui/flex";
import { useLoginStore } from "@/store/loginStore";
import { EAccountType } from "@/types/enums";

import { termsText } from "./termsText";

export function TermsDialog({
	isOpen,
	close,
}: {
	isOpen: boolean;
	close: () => void;
}) {
	const { user, setUser } = useLoginStore();

	const onSuccess = useCallback(() => {
		setUser({ ...user!, acceptedTerms: true });
		close();
	}, [user, setUser, close]);

	const { doEditAdvertiserProfile } = useUpdateAdvertiserProfile(onSuccess);
	const { doEditSellerProfile } = useUpdateSellerProfile(onSuccess);
	const { doEditTourGuideProfile } = useUpdateTourGuideProfile(onSuccess);

	const onAcceptClick = useCallback(() => {
		if (user?.type === EAccountType.Advertiser) {
			doEditAdvertiserProfile({ acceptedTerms: true });
		}
		if (user?.type === EAccountType.Seller) {
			doEditSellerProfile({ acceptedTerms: true });
		}
		if (user?.type === EAccountType.Guide) {
			doEditTourGuideProfile({ acceptedTerms: true });
		}
	}, [
		user,
		doEditAdvertiserProfile,
		doEditSellerProfile,
		doEditTourGuideProfile,
	]);

	return (
		<Dialog open={isOpen} onOpenChange={() => {}}>
			<DialogContent className="w-1/2 [&>button]:hidden">
				<DialogHeader>
					<DialogTitle>Accept terms and conditions</DialogTitle>
					<DialogDescription>
						You have to accept our terms and conditions to continue.
					</DialogDescription>
				</DialogHeader>
				<Flex
					isColumn
					className="h-[500px] w-full overflow-y-scroll"
					gap="1"
				>
					{termsText.split("\n").map((line, index) => (
						<p key={index}>{line}</p>
					))}
				</Flex>
				<DialogFooter>
					<Button type="submit" onClick={onAcceptClick}>
						I accept
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
