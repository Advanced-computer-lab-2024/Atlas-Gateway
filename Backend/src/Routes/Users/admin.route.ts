import express from "express";

import {
	createAdmin,
	deleteAdmin,
	getAdmins,
} from "../../Controllers/Users/admin.controller";

const router = express.Router();

router.post("/create", createAdmin);
router.get("/list", getAdmins);
router.delete("/delete/:id", deleteAdmin);

export default router;
