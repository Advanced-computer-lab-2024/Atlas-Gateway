import express from "express";

import {
	changePassword,
	forgetPassword,
} from "../../Controllers/Auth/password.controller";

const router = express.Router();

router.put("/change", changePassword);
router.put("/forget", forgetPassword);
export default router;
