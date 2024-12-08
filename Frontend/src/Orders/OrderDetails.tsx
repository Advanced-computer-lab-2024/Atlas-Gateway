import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useOrder, useOrders } from "@/api/data/useOrders";
import { useTouristProfile } from "@/api/data/useProfile";
import Label from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";
import useCurrency from "@/hooks/useCurrency";
import { useLoginStore } from "@/store/loginStore";
import { TOrder } from "@/types/global";

export default function ProductDetails() {
	const navigate = useNavigate();
	const convertCurrency = useCurrency();

	const { user } = useLoginStore();
	//const { data: userProfile } = useTouristProfile();
	//console.log(userProfile);
	const { data: order } = useOrder(user?._id);

	//const [productPic, setProductPic] = useState("");

	return (
		<Flex
			justify="center"
			align="center"
			className="p-4 overflow-y-scroll w-full h-full"
			isColumn
		>
			<Card className="w-[80%] border-black border-2">
				<CardHeader>
					<Flex gap="2" align="center">
						<ArrowLeft
							className="cursor-pointer"
							onClick={() => navigate("/products")}
							size={32}
						/>
						<Label.Big600>Order {order?._id}</Label.Big600>
					</Flex>
				</CardHeader>
				<CardContent></CardContent>
			</Card>
		</Flex>
	);
}
