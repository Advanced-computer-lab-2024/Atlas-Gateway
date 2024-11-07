import { formatDate } from "date-fns";
import { capitalize } from "lodash";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
	useComplaint,
	useComplaintsUpdateByAdmin,
} from "@/api/data/useComplaints";
import Label from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";
import { Textarea } from "@/components/ui/textarea";

export default function ComplaintDetails() {
	const navigate = useNavigate();
	const { data, refetch } = useComplaint();

	const { title, body, createdAt, updatedAt, status, reply, createdBy } =
		data || {};

	const { doUpdateComplaintByAdmin } = useComplaintsUpdateByAdmin(refetch);

	const [replyInput, setReplyInput] = useState(reply);

	return (
		<Flex align="center" justify="center" className="w-full h-full">
			<Card className="w-[80%] h-[80%] border-[#2b58ed] border-2">
				<CardHeader>
					<Flex gap="2" align="center">
						<ArrowLeft
							className="cursor-pointer"
							onClick={() => navigate("/admin")}
							size={32}
						/>
						<Label.Big600>Complaint Details</Label.Big600>
					</Flex>
				</CardHeader>
				<CardContent className="grid grid-cols-2 w-full">
					<Flex
						isColumn
						gap="4"
						className="w-full border-r border-solid pr-2"
					>
						<Label.Big500>Complaint content</Label.Big500>
						<Flex gap="3" isColumn align="center">
							<Flex gap="2" isColumn>
								<Label.Thin300>Author</Label.Thin300>
								<Label.Mid500>
									{createdBy?.username ?? "-"}
								</Label.Mid500>
							</Flex>
							<Flex gap="2" isColumn>
								<Label.Thin300>Title</Label.Thin300>
								<Label.Mid500>{title ?? "-"}</Label.Mid500>
							</Flex>
							<Flex gap="2" isColumn className="w-full">
								<Label.Thin300>Complaint body</Label.Thin300>
								<Flex className="w-full rounded-lg p-2 overflow-y-scroll h-80 border">
									{body}
								</Flex>
							</Flex>
						</Flex>
					</Flex>
					<Flex isColumn gap="4" className="w-full pl-2">
						<Label.Big500>Complaint info</Label.Big500>
						<Flex gap="3" isColumn align="center">
							<Flex gap="2" isColumn>
								<Label.Thin300>Creation Date</Label.Thin300>
								<Label.Mid500 className="overflow-ellipsis">
									{formatDate(
										new Date(createdAt || 0),
										"dd/MM/yyyy HH:mm:ss a",
									)}
								</Label.Mid500>
							</Flex>
							<Flex gap="2" isColumn>
								<Label.Thin300>
									Latest Update Date
								</Label.Thin300>
								<Label.Mid500 className="overflow-ellipsis">
									{formatDate(
										new Date(updatedAt || 0),
										"dd/MM/yyyy HH:mm:ss a",
									)}
								</Label.Mid500>
							</Flex>
							<Flex gap="2" isColumn>
								<Label.Thin300>Status</Label.Thin300>
								<Flex gap="6">
									<Label.Mid500 className="overflow-ellipsis">
										{capitalize(status)}
									</Label.Mid500>
									{status === "pending" && (
										<Button
											variant="default"
											onClick={() => {
												doUpdateComplaintByAdmin({
													status: "resolved",
												});
											}}
										>
											Mark as resolved
										</Button>
									)}
								</Flex>
							</Flex>
							<Flex gap="2" isColumn>
								<Label.Thin300>Reply</Label.Thin300>
								<Textarea
									className="border border-[#2b58ed] w-full h-full resize-none"
									id="description"
									rows={10}
									cols={84}
									name="description"
									onChange={(e) =>
										setReplyInput(e.target.value)
									}
									disabled={reply !== ""}
									value={replyInput}
								/>
								{!reply ? (
									<Button
										onClick={() => {
											doUpdateComplaintByAdmin({
												reply: replyInput,
											});
										}}
									>
										Send Reply
									</Button>
								) : (
									<Label.Thin200>
										This complaint has already been replied
										to
									</Label.Thin200>
								)}
							</Flex>
						</Flex>
					</Flex>
				</CardContent>
			</Card>
		</Flex>
	);
}
