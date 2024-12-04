import express from "express";

import { viewNumberOfUser } from "../../Controllers/UserStatistics/userStatistics.controller";
import {
	createAdmin,
	deleteAdmin,
	getAdmins,
	salesReport,
} from "../../Controllers/Users/admin.controller";

const router = express.Router();

router.post("/create", createAdmin);
router.get("/list", getAdmins);
router.delete("/delete/:id", deleteAdmin);
router.get("/userStats", viewNumberOfUser);
router.get("/report", salesReport);

export default router;
