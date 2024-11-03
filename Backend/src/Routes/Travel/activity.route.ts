import express from "express";

import {
	createActivities,
	deleteActivityById,
	getActivities,
	getActivityById,
	getActivitybyUserId,
	updateActivityById,
	bookActivity,
	cancelBookingActivity,
} from "../../Controllers/Travel/activity.controller";

const router = express.Router();

router.post("/create", createActivities);
router.get("/show/:id", getActivityById);
router.get("/listAdvertisor", getActivitybyUserId);
router.get("/list", getActivities);
router.put("/update/:id", updateActivityById);
router.put("/book/:id/:id", bookActivity);
router.put("/cancel/:id/:id", cancelBookingActivity);
router.delete("/delete/:id", deleteActivityById);

export default router;
