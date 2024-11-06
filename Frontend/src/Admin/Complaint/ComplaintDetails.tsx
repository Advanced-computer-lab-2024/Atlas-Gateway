import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
	useComplaint,
	useComplaintsUpdateByAdmin,
} from "@/api/data/useComplaints";
import Label from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";
import { Textarea } from "@/components/ui/textarea";

export default function ComplaintDetails() {
	const navigate = useNavigate();
	const { data, refetch } = useComplaint();
	const { doUpdateComplaintByAdmin } = useComplaintsUpdateByAdmin(refetch);

	const { title, body, date, state, reply, createdBy } = data || {};

	const [replyByAdmin, setReplyByAdmin] = useState(reply);

	return (
		<Flex
			isColumn
			gap="4"
			align="center"
			className="px-4 py-4 overflow-y-scroll"
		>
			<Card className="w-[80%] h-[500px] flex-col border-[#2b58ed] border-2 p-4">
				<Flex isColumn gap="4">
					<Flex gap="2" align="center">
						<ArrowLeft
							className="cursor-pointer"
							onClick={() => navigate("/admin")}
							size={32}
						/>
						<Label.Big600>Complaint Details</Label.Big600>
					</Flex>
					<Flex>
						<Flex isColumn justify="around">
							<Flex gap="2" align="center">
								<Label.Big600 className="w-52 text-left">
									Tourist Name:{" "}
								</Label.Big600>
								<Label.Mid500 className="overflow-ellipsis">
									{createdBy?.username}
								</Label.Mid500>
							</Flex>
							<Card className="border-hidden">
								<Flex gap="20">
									<Label.Big600 className="text-left">
										Complaint:{" "}
									</Label.Big600>
									<Card className="border border-[#2b58ed]">
										<Label.Mid500 className="p-3">
											<Label.Big500 className="text-left">
												{title}
											</Label.Big500>
											<Label.Mid500 className="text-center">
												{body}
											</Label.Mid500>
										</Label.Mid500>
									</Card>
								</Flex>
							</Card>

							<Flex gap="2" align="center">
								<Label.Big600 className="w-52 text-left">
									Date:{" "}
								</Label.Big600>
								<Label.Mid500 className="overflow-ellipsis">
									{date &&
										new Date(date).toLocaleDateString(
											"en-US",
										)}
								</Label.Mid500>
							</Flex>
							<Flex gap="2" align="center">
								<Label.Big600 className="w-52 text-left">
									Status:{""}
								</Label.Big600>
								<Label.Mid500 className="overflow-ellipsis">
									{state}
								</Label.Mid500>
								<Button
									onClick={() => {
										doUpdateComplaintByAdmin({
											state:
												state === "pending"
													? "resolved"
													: "pending",
										});
									}}
								>
									Mark as{" "}
									{state === "pending"
										? "resolved"
										: "pending"}
								</Button>
							</Flex>
							<Flex gap="2">
								<Label.Big600 className="w-52 text-left">
									Reply:{" "}
								</Label.Big600>
								<Label.Mid500 className="overflow-ellipsis">
									<Textarea
										className="border border-[#2b58ed]"
										id="description"
										name="description"
										onChange={(e) => setReplyByAdmin(e.target.value)}
										value={replyByAdmin}
									/>
								</Label.Mid500>
								<Button
									onClick={() =>
										doUpdateComplaintByAdmin({
											...data,
											reply: replyByAdmin,
										})
									}
								>
									Send Reply
								</Button>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Card>
		</Flex>
	);
}
