import { Request, Response } from "express";
import { Types } from "mongoose";

import { IProductTuple, Order } from "../../Models/Purchases/order.model";
import { Product } from "../../Models/Purchases/product.model";
import { Tourist } from "../../Models/Users/tourist.model";

export const createOrder = async (req: Request, res: Response) => {
	//Called When clicking checkout
	try {
		const userId = req.headers.userid;
		const { products, totalPrice, address, paymentMethod } = req.body;
		if (!userId) {
			res.status(400).send("Logged in User id is required");
			return;
		}

		if (!products || !totalPrice || !address || !paymentMethod) {
			res.status(400).send("All fields are required");
			return;
		}

		if (!(await Tourist.findById(userId))) {
			res.status(404).send("Tourist not found");
			return;
		}

		let tourist = await Tourist.findById(userId);

		const order = new Order({
			touristId: userId,
			products,
			totalPrice,
			address,
			paymentMethod,
		});

		await order.save();

		let stockUpdateList: Promise<void>[] = [];

		products.forEach((productTuple: IProductTuple) => {
			stockUpdateList.push(
				updateStock(productTuple.productId, productTuple.quantity),
			);
			if (!tourist?.purchaseProducts.includes(productTuple.productId))
				tourist?.purchaseProducts.push(productTuple.productId);
		});

		await Promise.all(stockUpdateList);

		if (tourist) {
			tourist.cart = [];
		}
		await tourist?.save();

		res.status(201).send(order);
	} catch (error) {
		res.status(500).send("Internal Server Error");
		console.error(error);
	}
};

async function updateStock(productId: Types.ObjectId, quantity: number) {
	const product = await Product.findById(productId);
	if (!product) {
		throw new Error("Product not found /This is the update stock method/");
	}
	product.set({ quantity: product.quantity - quantity });
	await product.save();
}

export const listUserOrders = async (req: Request, res: Response) => {
	try {
		const userId = req.headers.userid;
		if (!userId) {
			res.status(400).send("Logged in User id is required");
			return;
		}

		const orders = await Order.find({ touristId: userId });

		if (orders.length === 0) {
			res.status(404).send("No Orders found");
			return;
		}

		res.status(200).send(orders);
	} catch (error) {
		res.status(500).send("Internal Server Error");
		console.error(error);
	}
};

export const showOrder = async (req: Request, res: Response) => {
	try {
		const userId = req.headers.userid;
		const orderId = req.params.id;
		if (!userId) {
			res.status(400).send("Logged in User id is required");
			return;
		}

		if (!orderId) {
			res.status(400).send("Order id is required");
			return;
		}

		const order = await Order.findById(orderId);

		if (!order) {
			res.status(404).send("Order not found");
			return;
		}

		res.status(200).send(order);
	} catch (error) {
		res.status(500).send("Internal Server Error");
		console.error(error);
	}
};

export const cancelOrder = async (req: Request, res: Response) => {
	try {
		const userId = req.headers.userid;
		const orderId = req.params.id;
		if (!userId) {
			res.status(400).send("Logged in User id is required");
			return;
		}

		if (!(await Tourist.findById(userId))) {
			res.status(404).send("Tourist not found");
			return;
		}

		let tourist = await Tourist.findById(userId);

		if (!orderId) {
			res.status(400).send("Order id is required");
			return;
		}
		let order = await Order.findById(orderId);

		if (!order) {
			res.status(404).send("Order not found");
			return;
		}

		if (order.touristId.toString() !== userId) {
			res.status(403).send(
				"Unauthorized User (Cannon Cancel Someone else's order)",
			);
			return;
		}

		if (order.status === "Cancelled" || order.status === "Completed") {
			res.status(400).send("Order already Cancelled or Completed");
			return;
		}

		let stockUpdateList: Promise<void>[] = [];

		order.products.forEach((productTuple: IProductTuple) => {
			stockUpdateList.push(
				updateStock(productTuple.productId, -productTuple.quantity),
			); //using the same updateStock method, -ve quantity to add back the stock
		});

		await Promise.all(stockUpdateList);

		order.set({ status: "Cancelled" });

		await order.save();

		tourist?.set({
			walletBalance: tourist.walletBalance + order.totalPrice,
		});
		await tourist?.save();

		res.status(200).send("Order Canceled");
	} catch (error) {
		res.status(500).send("Internal Server Error");
		console.error(error);
	}
};

export const addAddress = async (req: Request, res: Response) => {
	try {
		const userId = req.headers.userid;
		console.log(userId);
		const { country, city, street, houseNumber, apartmentNumber } =
			req.body;
		const tourist = await Tourist.findById(userId);
		if (!userId) {
			res.status(400).send("Logged in User id is required");
			return;
		}

		if (!country || !city || !street) {
			res.status(400).send("All fields are required");
			return;
		}

		if (!tourist) {
			res.status(404).send("Tourist account not found");
			return;
		}

		const addressString = country +", "+ city +", "+ street + (houseNumber? ", "+ houseNumber : "") + (apartmentNumber? ", "+ apartmentNumber : "");

		if(tourist.address?.includes(addressString)){
			res.status(200).send("Address already exists");
			return;
		}

		tourist.address?.push(addressString);

		await tourist.save();

		res.status(201).send("Address Added Successfully");
	} catch (error) {
		res.status(500).send("Internal Server Error");
		console.error(error);
	}
};

