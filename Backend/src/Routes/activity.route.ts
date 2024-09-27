import express from "express";
const router = express.Router();
import {
  createActivities,
  getActivities,
  updateActivityById,
  deleteActivityById,
} from "../Controllers/activity.controller";

router.post("/createActivities", createActivities);
router.get("/getActivities", getActivities);
router.put("/updateActivitiy/:id", updateActivityById);
router.delete("/deleteActivitiy/:id", deleteActivityById);

export default router;
