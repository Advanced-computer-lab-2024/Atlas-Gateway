import { Express, Router } from "express";

import {
	createTourist,
	deleteTourist,
	getTourists,
	updateTourist,
} from "../../Controllers/Users/tourist.controller";
const touristRouter = Router();
touristRouter.post("/create", createTourist);
touristRouter.get("/list", getTourists);
touristRouter.put("/update/:id", updateTourist);
touristRouter.delete("/delete/:id", deleteTourist);
export default touristRouter;
Router;
