import express from "express";
import multer from "multer";

import {
	register,
	uploadDocument,
} from "../../Controllers/Auth/register.controller";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/create", register);
router.post("/upload", upload.single("file"), uploadDocument);
export default router;
