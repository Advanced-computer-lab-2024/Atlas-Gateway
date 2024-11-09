import { Router } from "express";

import {
	deleteFlightController,
	saveFlight,
	searchFlights,
} from "../../Controllers/Flight/flight.controller";

const productRouter = Router();

productRouter.post("/save", saveFlight);
productRouter.post("/search", searchFlights);
productRouter.delete("/delete/:id", deleteFlightController);

export default productRouter;
