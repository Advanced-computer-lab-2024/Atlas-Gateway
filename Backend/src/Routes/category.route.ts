import express from "express";

import {
	createCategory,
	deleteCategory,
	getCategories,
	updateCategory,
} from "../Controllers/category.controller";

const router = express.Router();

router.post("/create", createCategory);
router.get("/list", getCategories);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

export default router;
