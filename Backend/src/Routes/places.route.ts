import express from "express";

import {
	createPlace,
	getPlaceById,
	getPlaces,
	updatePlace,
} from "../Controllers/places.controller";

const router = express.Router();

router.post("/create", createPlace);
router.get("/list", getPlaces);
router.get("/show/:id", getPlaceById);
router.put("/update", updatePlace);

export default router;
