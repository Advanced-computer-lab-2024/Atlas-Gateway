import express from "express";

import {
	createTransportation,
	deleteTransportation,
	getTransportation,
	getTransportationById,
	getTransportationByUserId,
    updateTransportation,
    bookTransportation,
} from "../../Controllers/Travel/transportation.controller";

const router = express.Router();

router.post("/create", createTransportation);
router.get("/list", getTransportation);
router.get("/listAdvertiser", getTransportationByUserId);
router.get("/show/:id", getTransportationById);
router.put("/update/:id", updateTransportation);
//              /:transportationId/:touristId
router.put("/book/:id/:id", bookTransportation);
router.delete("/delete/:id", deleteTransportation);

export default router;
