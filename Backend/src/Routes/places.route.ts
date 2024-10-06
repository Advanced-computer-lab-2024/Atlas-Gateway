import express from "express";

import {
	createPlace,
	deletePlace,
	getPlaceById,
	getPlaces,
	updatePlace,
} from "../Controllers/places.controller";

const router = express.Router();

router.post("/create", createPlace);
router.get("/list", getPlaces);
router.get("/show/:id", getPlaceById);
router.put("/update/:id", updatePlace);
router.delete("/delete/:id", deletePlace);

export default router;
