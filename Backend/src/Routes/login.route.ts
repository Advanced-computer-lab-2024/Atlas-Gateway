import express from "express";

import { login } from "../Controllers/login.controller";

const router = express.Router();

router.post("", login);

export default router;
