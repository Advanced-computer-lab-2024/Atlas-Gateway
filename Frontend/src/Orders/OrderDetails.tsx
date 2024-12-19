import axios from "axios";
import { formatDate } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useOrder, useOrders } from "@/api/data/useOrders";
import Label from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";
import useCurrency from "@/hooks/useCurrency";
import { useLoginStore } from "@/store/loginStore";
import { TOrder } from "@/types/global";

import OrderItem from "./OrderItem";

export default function OrderDetails() {
	const formatCurrency = useCurrency();
	const navigate = useNavigate();

	const { user } = useLoginStore();
	//const { data: userProfile } = useTouristProfile();
	//console.log(userProfile);
	const { data: order, refetch } = useOrder();

	//const [productPic, setProductPic] = useState("");

	const cancelOrder = async () => {
		const userId = user?._id;
		const cancelButton = document.getElementById("cancelButton");

		if (cancelButton) {
			cancelButton.classList.remove("bg-red-500");
			cancelButton.classList.add("bg-blue-500");
			cancelButton.innerHTML = "Cancelling Order...";
		}
		await axios
			.post(
				`http://localhost:5000/api/orders/cancel/${order?._id}`,
				{},
				{
					headers: {
						"Content-Type": "application/json",
						userid: userId,
					},
				},
			)
			.then(() => {
				if (cancelButton) {
					cancelButton.innerHTML = "Cancelled";

					setTimeout(() => {
						cancelButton.classList.remove("bg-blue-500");
						cancelButton.classList.add("bg-red-500");
					}, 3000);
				}
			})
			.catch(() => {
				if (cancelButton) {
					cancelButton.classList.remove("bg-green-500");
					cancelButton.classList.add("bg-red-500");
					cancelButton.innerHTML = "Failed!";

					setTimeout(() => {
						cancelButton.innerHTML = "Cancel Order";
					}, 3000);
				}
			});

		refetch();
	};

	return (
		<>
			<Flex
				justify="center"
				align="center"
				className="p-4 overflow-y-scroll w-full h-full"
				isColumn
			>
				<Card
					className="w-[80%] border-black border-2"
					style={{ minHeight: "50lvh" }}
				>
					<CardHeader
						style={{
							display: "flex",
							justifyContent: "space-between",
							flexWrap: "nowrap",
						}}
					>
						<Flex gap="2" align="center" justify="between">
							<Flex gap="2" align="center" justify="between">
								<ArrowLeft
									className="cursor-pointer"
									onClick={() => navigate("/products")}
									size={32}
								/>
								<Label.Big600>Order {order?._id}</Label.Big600>
							</Flex>
							<Label.Big400 className="self-end">
								{formatDate(
									new Date(order?.date || "0"),
									"dd/MM/yyyy HH:mm:ss a",
								)}
							</Label.Big400>
						</Flex>
					</CardHeader>
					<CardContent
						style={{
							minHeight: "90%",
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
						}}
					>
						<div>
							<hr className="border-solid border-gray-200 border-2" />

							{order?.products.map((item) => (
								<OrderItem
									key={item.productId}
									product={item.product}
									quantity={item.quantity}
								/>
							))}
						</div>

						<div>
							<hr className="border-solid border-gray-200 border-1" />
							<Flex justify="between">
								<Flex className="w-full justify-items-stretch ml-4">
									<Label.Mid600>
										Subtotal ({order?.products.length} item
										{(
											order?.products.length
												? order.products.length > 1
												: false
										)
											? "s"
											: ""}
										)
									</Label.Mid600>
								</Flex>
								<Label.Mid600
									style={{
										alignSelf: "end",
										textAlign: "right",
										flexBasis: "50%",
									}}
								>
									{formatCurrency(
										order?.products.reduce(
											(acc, { product, quantity }) =>
												acc + product.price * quantity,
											0,
										),
									)}
								</Label.Mid600>
							</Flex>

							<hr className="border-solid border-gray-200 border-1" />
							<Flex
								className="mt-4 pl-4"
								gap="3"
								style={{
									flexBasis: "100%",
									justifyContent: "between",
								}}
							>
								<Flex
									className=""
									gap="3"
									style={{
										flexBasis: "100%",
										justifyContent: "start",
									}}
								>
									<Flex gap="2" align="center">
										<Label.Mid500>
											Payment Method:
										</Label.Mid500>
										<Label.Mid500>
											{order?.paymentMethod}
										</Label.Mid500>
									</Flex>
									<Flex
										gap="2"
										align="center"
										className="ml-10"
									>
										<Label.Mid500>Status:</Label.Mid500>
										<Label.Mid500>
											{order?.status}
										</Label.Mid500>
									</Flex>
								</Flex>
								<Button
									id="cancelButton"
									className="bg-red-500 disabled:bg-gray-500"
									disabled={order?.status === "Cancelled"}
									onClick={() => {
										cancelOrder();
									}}
								>
									Cancel Order
								</Button>
							</Flex>
						</div>
					</CardContent>
				</Card>
			</Flex>
		</>
	);
}
