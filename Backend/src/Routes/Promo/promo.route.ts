import { Router } from "express";

import {
	checkPromo,
	createPromo,
	deletePromoByCode,
	listPromos,
} from "../../Controllers/Promo/promo.controller";

const productRouter = Router();

productRouter.post("/create", createPromo);
productRouter.get("/check/:id", checkPromo);
productRouter.delete("/delete/:id", deletePromoByCode);
productRouter.get("/list", listPromos);

export default productRouter;
