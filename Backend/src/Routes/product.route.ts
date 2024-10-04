import { Router } from "express";

import * as product from "../Controllers/product.controller";

const productRouter = Router();

productRouter.post("/create", product.createProduct);
productRouter.get("/list", product.getProducts);
productRouter.put("/update/:id", product.updateProduct);
productRouter.get("/:id", product.getProduct);

export default productRouter;
