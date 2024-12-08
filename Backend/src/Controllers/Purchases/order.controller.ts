import { Request, Response } from "express";

import { Tourist } from "../../Models/Users/tourist.model";
import { Order } from "../../Models/Purchases/order.model";
import { CANCELLED } from "dns";

export const createOrder = async (req: Request, res: Response) => { //Called When clicking checkout
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

        if (!await Tourist.findById(userId)) {
            res.status(404).send("Tourist not found");
            return;
        }

        const order = new Order({
            touristId: userId,
            products,
            totalPrice,
            address,
            paymentMethod
        });

        await order.save();

        res.status(201).send(order);
    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.error(error);
    }
};

export const listUserOrders = async (req: Request, res: Response) => {
    try {
        const userId = req.headers.userid;
        if (!userId) {
            res.status(400).send("Logged in User id is required");
            return;
        }
        res.status(200).send("User Orders");
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
}

export const cancelOrder = async (req: Request, res: Response) => {
    try {
        const userId = req.headers.userid;
        const orderId = req.params.id;
        if (!userId) {
            res.status(400).send("Logged in User id is required");
            return;
        }

        if(!await Tourist.findById(userId)){
            res.status(404).send("Tourist not found");
            return;
        }
        
        if (!orderId) {
            res.status(400).send("Order id is required");
            return;
        }
        let order = await Order.findById(orderId);

        if(!order){
            res.status(404).send("Order not found");
            return;
        }

        order.set({status: CANCELLED});

        await order.save();

        res.status(200).send("Order Canceled");
    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.error(error);
    }
}