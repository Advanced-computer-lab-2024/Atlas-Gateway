import { Router } from "express";

import * as product from "../Controllers/product.controller";

const productRouter = Router();

productRouter.post("/create", product.createProduct);
productRouter.get("/list", product.getProducts);
productRouter.get("/get/:id", product.getProduct);

export default productRouter;
