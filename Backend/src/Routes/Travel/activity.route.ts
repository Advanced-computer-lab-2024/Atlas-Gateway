import express from "express";

import {
	createActivities,
	deleteActivityById,
	getActivities,
	getActivityById,
	getActivitybyUserId,
	updateActivityById,
} from "../../Controllers/Travel/activity.controller";

const router = express.Router();

router.post("/create", createActivities);
router.get("/show/:id", getActivityById);
router.get("/listAdvertisor", getActivitybyUserId);
router.get("/list", getActivities);
router.put("/update/:id", updateActivityById);
router.delete("/delete/:id", deleteActivityById);

export default router;
