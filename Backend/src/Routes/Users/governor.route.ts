import express from "express";

import {
	crteatGovernor,
	getGovernors,
} from "../../Controllers/Users/governor.controller";

const router = express.Router();

router.post("/create", crteatGovernor);
router.get("/list", getGovernors);

export default router;
