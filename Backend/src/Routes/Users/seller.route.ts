import { Express, Router } from "express";

import {
	createSeller,
	deleteSeller,
	getSeller,
	getSellers,
	salesReport,
	softDeleteSeller,
	updateSeller,
} from "../../Controllers/Users/seller.controller";

const SellerRouter = Router();
SellerRouter.post("/create", createSeller);
SellerRouter.get("/list", getSellers);
SellerRouter.get("/show/:id", getSeller);
SellerRouter.put("/update/:id", updateSeller);
SellerRouter.delete("/delete/:id", deleteSeller);
SellerRouter.delete("/requestDelete/:id", softDeleteSeller);
SellerRouter.get("/sales/:id", salesReport);
export default SellerRouter;
