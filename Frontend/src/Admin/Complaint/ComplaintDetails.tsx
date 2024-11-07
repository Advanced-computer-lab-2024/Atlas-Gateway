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

	const { title, body, date, state, reply, createdBy } = data || {};

	const { doUpdateComplaintByAdmin } = useComplaintsUpdateByAdmin(refetch);

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
							<Flex gap="2" align="center">
								<Label.Big600 className=" w-52 text-left">
									Complaint title:{" "}
								</Label.Big600>
								<Label.Big500 className="text-center">
									{title}
								</Label.Big500>
							</Flex>
							<Flex gap="2" align="center">
								<Label.Big600 className="w-52 text-left">
									Complaint body:{" "}
								</Label.Big600>
								<Card className="p-5 overflow-auto w-[80%] h-[100px] border-[#2b58ed] border">
									<Label.Mid500 className="overflow-ellipsis text-left">
										{body}
									</Label.Mid500>
								</Card>
							</Flex>

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
										onChange={(e) =>
											setReplyByAdmin(e.target.value)
										}
										value={replyByAdmin}
									/>
								</Label.Mid500>
							</Flex>
							<br></br>
							<Button
								onClick={() => {
									doUpdateComplaintByAdmin({
										state:
											state === "pending"
												? "resolved"
												: "pending",
										reply: replyByAdmin,
									});
								}}
							>
								Mark as{" "}
								{state === "pending" ? "resolved" : "pending"}{" "}
								and Send Reply
							</Button>
						</Flex>
					</Flex>
				</Flex>
			</Card>
		</Flex>
	);
}
