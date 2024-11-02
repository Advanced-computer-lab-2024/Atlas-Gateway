import express from "express";

import { changePassword } from "../../Controllers/Auth/password.controller";

const router = express.Router();

router.put("", changePassword);

export default router;
