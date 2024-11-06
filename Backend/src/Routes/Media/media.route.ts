import { Router } from "express";
import multer from "multer";

import { download, upload } from "../../Controllers/Media/media.controller";

const mediaRouter = Router();
const storage = multer.memoryStorage();
const mediaUpload = multer({ storage: storage });

mediaRouter.post("/upload", mediaUpload.single("file"), upload);
mediaRouter.post("/download", download);

export default mediaRouter;
