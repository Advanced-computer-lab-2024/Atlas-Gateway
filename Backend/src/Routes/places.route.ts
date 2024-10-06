import express from "express";

import {
	createPlace,
	getPlaceById,
	getPlaces,
} from "../Controllers/places.controller";

const router = express.Router();

router.post("/create", createPlace);
router.get("/list", getPlaces);
router.get("/show/:id", getPlaceById);

export default router;
