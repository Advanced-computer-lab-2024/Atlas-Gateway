import express from "express";

import {
	bookActivity,
	cancelBookingActivity,
	createActivities,
	deleteActivityById,
	getActivities,
	getActivityById,
	getActivitybyCreator,
	updateActivityById,
} from "../../Controllers/Travel/activity.controller";

const router = express.Router();

router.post("/create", createActivities);
router.get("/show/:id", getActivityById);
router.get("/listTransportations", getActivitybyCreator);
router.get("/list", getActivities);
router.put("/update/:id", updateActivityById);
router.delete("/delete/:id", deleteActivityById);
router.post("/book/:id", bookActivity);
router.post("/cancelBooking/:id", cancelBookingActivity);

export default router;
