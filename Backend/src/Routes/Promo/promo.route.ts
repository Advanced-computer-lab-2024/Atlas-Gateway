import { Router } from "express";

import {
	checkPromo,
	createPromo,
	deletePromoByCode,
	listPromos,
} from "../../Controllers/Promo/promo.controller";

const productRouter = Router();

productRouter.post("/create", createPromo);
productRouter.get("/check/:promoCode", checkPromo);
productRouter.delete("/delete/:promoCode", deletePromoByCode);
productRouter.get("/list", listPromos);

export default productRouter;
