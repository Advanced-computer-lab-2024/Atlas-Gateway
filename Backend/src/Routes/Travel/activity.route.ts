import express from "express";

import {
	bookActivity,
	bookmarkActivity,
	cancelBookingActivity,
	createActivities,
	deleteActivityById,
	getActivities,
	getActivityById,
	getActivitybyCreator,
	removeBookmarkActivity,
	updateActivityById,
} from "../../Controllers/Travel/activity.controller";

const router = express.Router();

router.post("/create", createActivities);
router.get("/show/:id", getActivityById);
router.get("/listAdvertisor", getActivitybyCreator);
router.get("/list", getActivities);
router.put("/update/:id", updateActivityById);
router.delete("/delete/:id", deleteActivityById);
router.post("/book/:id", bookActivity);
router.post("/cancelBooking/:id", cancelBookingActivity);
router.post("/bookmark/:id", bookmarkActivity);
router.post("/removeBookmark/:id", removeBookmarkActivity);

export default router;
