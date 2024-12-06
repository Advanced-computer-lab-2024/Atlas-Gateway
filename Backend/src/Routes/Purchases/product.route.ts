import { Router } from "express";

import {
	addwishlistProduct,
	createProduct,
	getProduct,
	getProducts,
	removeWishlistProduct,
	updateProduct,
} from "../../Controllers/Purchases/product.controller";

const productRouter = Router();

productRouter.post("/create", createProduct);
productRouter.get("/show/:id", getProduct);
productRouter.get("/list", getProducts);
productRouter.put("/update/:id", updateProduct);
productRouter.post("/wishlist/:id", addwishlistProduct);
productRouter.post("/removeWishlist/:id", removeWishlistProduct);

export default productRouter;
