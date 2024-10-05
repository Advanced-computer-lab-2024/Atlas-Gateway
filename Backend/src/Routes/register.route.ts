import express from "express";

import { register } from "../Controllers/register.controller";

const router = express.Router();

router.post("/create", register);

export default router;
