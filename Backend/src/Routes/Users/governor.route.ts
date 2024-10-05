import express from "express";

import {
	crteatGovernor,
	deleteGovernor,
	getGovernors,
	getHistoricalLocations,
} from "../../Controllers/Users/governor.controller";

const router = express.Router();

router.post("/create", crteatGovernor);
router.get("/list", getGovernors);
router.get("/show/:id", getHistoricalLocations);
router.delete("/delete/:id", deleteGovernor);
export default router;
