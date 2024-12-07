import { NextFunction, Request, Response } from "express";

import * as paymentService from "../../Services/Payment/payment.service";

export const createPaymentIntent = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { currency, amount } = req.body;
		const paymentIntent = await paymentService.createPaymentIntent(
			amount,
			currency,
		);
		res.status(201).send(paymentIntent);
	} catch (error) {
		next(error);
	}
};
