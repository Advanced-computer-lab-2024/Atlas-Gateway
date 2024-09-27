import { Router } from "express";
import * as product from "../Controllers/product.controller";

const productRouter = Router();

productRouter.post("/createProduct", product.createProduct);
productRouter.get("/getProducts", product.getProducts);
productRouter.get("/getProduct/:id", product.getProduct);
productRouter.put("/updateProduct/:id", product.updateProduct);

export default productRouter;
