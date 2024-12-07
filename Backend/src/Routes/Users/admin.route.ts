import express from "express";

import {
	createAdmin,
	deleteAdmin,
	getAdminById,
	getAdmins,
} from "../../Controllers/Users/admin.controller";

const router = express.Router();

router.post("/create", createAdmin);
router.get("/list", getAdmins);
router.get("/show/:id", getAdminById);
router.delete("/delete/:id", deleteAdmin);

export default router;
