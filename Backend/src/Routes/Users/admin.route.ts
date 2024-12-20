import express from "express";

import { viewNumberOfUser } from "../../Controllers/UserStatistics/userStatistics.controller";
import {
	Report,
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
router.get("/userStats", viewNumberOfUser);
router.get("/report", Report);

export default router;
