// Pref-Tags and Historical tags will be placed in one controller, makes sense?
import { Router } from "express";

import * as tagController from "../../Controllers/Travel/tag.controller";

const tagRouter = Router();

tagRouter.post("/historical/create", tagController.createHistTag);
tagRouter.get("/historical/list", tagController.getHistTags);
tagRouter.post("/preference/create", tagController.createPrefTag);
tagRouter.get("/preference/list", tagController.getPrefTags);
tagRouter.put("/preference/update/:id", tagController.updatePrefTag);
tagRouter.delete("/preference/delete/:id", tagController.deletePreTag);
tagRouter.get("/list", tagController.getAllTags);

export default tagRouter;
