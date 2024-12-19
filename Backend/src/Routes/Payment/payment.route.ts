import express from "express";

import { createPaymentIntent } from "../../Controllers/Payment/payment.controller";

const paymentRouter = express.Router();

paymentRouter.post("/createPaymentIntent", createPaymentIntent);

export default paymentRouter;
