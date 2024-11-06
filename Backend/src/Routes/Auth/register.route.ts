import express from "express";
import multer from "multer";

import { register } from "../../Controllers/Auth/register.controller";

const router = express.Router();

router.post("/create", register);
export default router;
