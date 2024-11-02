import express from "express";

import {
	createCategory,
	deleteCategory,
	getCategories,
	getCategoryById,
	updateCategory,
} from "../../Controllers/Travel/category.controller";

const router = express.Router();

router.post("/create", createCategory);
router.get("/list", getCategories);
router.get("/show/:id", getCategoryById);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

export default router;
