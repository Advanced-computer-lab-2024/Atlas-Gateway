import { Router } from "express";

import * as orderController from "../../Controllers/Purchases/order.controller";

const orderRouter = Router();

orderRouter.post("/create", orderController.createOrder);
orderRouter.get("/list", orderController.listUserOrders);
orderRouter.get("/show/:id", orderController.showOrder);
orderRouter.post("/cancel/:id", orderController.cancelOrder);

orderRouter.post("/addAddress", orderController.addAddress);
orderRouter.post("/updateAddress", orderController.updateAddress);
orderRouter.get("/listAddresses", orderController.listAddresses);

export default orderRouter;
