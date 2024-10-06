import { Express, Router } from "express";

import {
	createSeller,
	deleteSeller,
	getSeller,
	getSellers,
	updateSeller,
} from "../../Controllers/Users/seller.controller";

const SellerRouter = Router();
SellerRouter.post("/create", createSeller);
SellerRouter.get("/list", getSellers);
SellerRouter.get("/show/:id", getSeller);
SellerRouter.put("/update/:id", updateSeller);
SellerRouter.delete("/delete/:id", deleteSeller);
export default SellerRouter;
