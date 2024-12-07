import express from "express";

import { viewNumberOfUser } from "../../Controllers/UserStatistics/userStatistics.controller";
import {
	createAdmin,
	deleteAdmin,
	getAdmins,
} from "../../Controllers/Users/admin.controller";

const router = express.Router();

router.post("/create", createAdmin);
router.get("/list", getAdmins);
router.delete("/delete/:id", deleteAdmin);
router.get("/userStats", viewNumberOfUser);

export default router;
