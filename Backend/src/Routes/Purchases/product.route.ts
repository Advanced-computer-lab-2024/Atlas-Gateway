import { Router } from "express";

import {
	createProduct,
	getProduct,
	getProducts,
	updateProduct,
} from "../../Controllers/Purchases/product.controller";

const productRouter = Router();

productRouter.post("/create", createProduct);
productRouter.get("/show/:id", getProduct);
productRouter.get("/list", getProducts);
productRouter.put("/update/:id", updateProduct);

export default productRouter;
