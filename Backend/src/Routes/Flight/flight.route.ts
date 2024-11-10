import { Router } from "express";

import {
	bookFlight,
	deleteFlightController,
	searchFlights,
} from "../../Controllers/Flight/flight.controller";

const productRouter = Router();

productRouter.post("/bookFlight", bookFlight);
productRouter.post("/search", searchFlights);
productRouter.delete("/delete/:id", deleteFlightController);

export default productRouter;
