import { Express, Router } from "express";

import {
	createTourist,
	deleteTourist,
	getTourist,
	getTourists,
	updateTourist,
} from "../../Controllers/Users/tourist.controller";

const touristRouter = Router();
touristRouter.post("/create", createTourist);
touristRouter.get("/show/:id", getTourist);
touristRouter.get("/list", getTourists);
touristRouter.put("/update/:id", updateTourist);
touristRouter.delete("/delete/:id", deleteTourist);
export default touristRouter;
Router;
