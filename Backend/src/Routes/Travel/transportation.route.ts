import express from "express";

import {
	bookTransportationById,
	cancelBookingTransportationById,
	createTransportation,
	deleteTransportationById,
	getTransportation,
	getTransportationByUserId,
	getTransportations,
	updateTransportationById,
} from "../../Controllers/Travel/transportation.controller";

const router = express.Router();

router.post("/create", createTransportation);
router.get("/get/:id", getTransportation);
router.get("/listAdvertisor", getTransportationByUserId);
router.get("/list", getTransportations);
router.put("/update/:id", updateTransportationById);
router.delete("/delete/:id", deleteTransportationById);
router.post("/book/:id", bookTransportationById);
router.delete("/cancelBooking/:id", cancelBookingTransportationById);

export default router;
