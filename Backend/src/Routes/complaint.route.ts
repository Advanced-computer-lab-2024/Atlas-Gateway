import { Router } from "express";



import * as ComplaintController from "../Controllers/complaint.controller";


const complaintRouter = Router();

complaintRouter.post("/create", ComplaintController.createComplaint);
complaintRouter.get("/list", ComplaintController.getAllComplaints);
complaintRouter.get("/form/:id", ComplaintController.getComplaintById);
complaintRouter.put("/updatebyadmin/:id", ComplaintController.updateComplaintByAdmin);
complaintRouter.put("/updatebytourist/:id", ComplaintController.updateComplaintByTourist);




export default complaintRouter;