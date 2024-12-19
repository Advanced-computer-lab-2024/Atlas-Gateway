import { Router } from "express";

import * as ComplaintController from "../../Controllers/Interactions/complaint.controller";

const complaintRouter = Router();

complaintRouter.post("/create", ComplaintController.createComplaint);
complaintRouter.get("/list", ComplaintController.getAllComplaints);
complaintRouter.get(
	"/list-profile",
	ComplaintController.getComplaintsByCreator,
);
complaintRouter.get("/show/:id", ComplaintController.getComplaintById);
complaintRouter.put("/update/:id", ComplaintController.updateComplaint);

export default complaintRouter;
