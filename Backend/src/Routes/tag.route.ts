// Pref-Tags and Historical tags will be placed in one controller, makes sense?
import { Router } from "express";

import * as tagController from "../Controllers/tag.controller";

const tagRouter = Router();

tagRouter.post("/historical/create", tagController.createHistTag);
tagRouter.get("/historical/get", tagController.getHistTags);
tagRouter.post("/preference/create", tagController.createPrefTag);
tagRouter.get("/preference/get", tagController.getPrefTags);
tagRouter.put("/preference/update/:id", tagController.updatePrefTag);
tagRouter.delete("/preference/delete/:id", tagController.deletePreTag);

export default tagRouter;
