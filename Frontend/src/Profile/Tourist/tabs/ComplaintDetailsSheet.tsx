import { formatDate } from "date-fns";
import { capitalize } from "lodash";

import Label from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { TComplaint } from "@/types/global";

export default function ComplaintDetailsSheet({
	complaint,
	open,
	setOpen,
}: {
	complaint?: TComplaint;
	open: boolean;
	setOpen: (open: boolean) => void;
}) {
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>
						<Label.Big600>Complaint details</Label.Big600>
					</SheetTitle>
				</SheetHeader>
				<Flex isColumn gap="4" className="py-6">
					<Flex isColumn gap="1">
						<Label.Thin200>Complaint ID</Label.Thin200>
						<Label.Mid400>{complaint?._id}</Label.Mid400>
					</Flex>
					<Flex isColumn gap="1">
						<Label.Thin200>Complaint Title</Label.Thin200>
						<Label.Mid400>{complaint?.title}</Label.Mid400>
					</Flex>
					<Flex isColumn gap="1">
						<Label.Thin200>Complaint Body</Label.Thin200>
						<Label.Mid400>{complaint?.body}</Label.Mid400>
					</Flex>
					<Flex isColumn gap="1">
						<Label.Thin200>Complaint Status</Label.Thin200>
						<Label.Mid400>
							{capitalize(complaint?.status)}
						</Label.Mid400>
					</Flex>
					<Flex isColumn gap="1">
						<Label.Thin200>Created At</Label.Thin200>
						<Label.Mid400>
							{formatDate(
								new Date(complaint?.createdAt || "0"),
								"dd/MM/yyyy HH:mm:ss a",
							)}
						</Label.Mid400>
					</Flex>
					{complaint?.reply && (
						<Flex isColumn gap="1">
							<Label.Thin200>Reply:</Label.Thin200>
							<Label.Mid400>{complaint?.reply}</Label.Mid400>
						</Flex>
					)}
					{complaint?.replyedBy && (
						<Flex isColumn gap="1">
							<Label.Thin200>Replied by:</Label.Thin200>
							<Label.Mid400>
								{complaint?.replyedBy?.username}
							</Label.Mid400>
						</Flex>
					)}
				</Flex>
				<SheetFooter>
					<SheetClose asChild>
						<Button>Close</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
