import express from "express";

import {
	createGovernor,
	deleteGovernor,
	getGovernor,
	getGovernors,
	getHistoricalLocations,
	updateGovernor,
} from "../../Controllers/Users/governor.controller";

const router = express.Router();

router.post("/create", createGovernor);
router.get("/list", getGovernors);
router.get("/showGoverner/:id", getGovernor);
router.put("/update/:id", updateGovernor);
router.get("/show/:id", getHistoricalLocations);
router.delete("/delete/:id", deleteGovernor);

export default router;
