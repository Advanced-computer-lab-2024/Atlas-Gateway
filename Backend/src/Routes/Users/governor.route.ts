import express from "express";

import {
	crteatGovernor,
	deleteGovernor,
	getGovernors,
} from "../../Controllers/Users/governor.controller";

const router = express.Router();

router.post("/create", crteatGovernor);
router.get("/list", getGovernors);
router.delete("/delete/:id", deleteGovernor);

export default router;
