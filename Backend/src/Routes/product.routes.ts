import { Router } from "express";
import * as product from "../Controllers/product.controller";

const productRouter = Router();

productRouter.post("/createProduct", product.createProduct);
productRouter.get("/getProducts", product.getProducts);

export default productRouter;
