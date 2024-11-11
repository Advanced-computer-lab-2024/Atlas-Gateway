import { Router } from "express";

import {
	bookFlight,
	deleteFlightController,
	searchFlights,
} from "../../Controllers/Flight/flight.controller";

const flightRouter = Router();

flightRouter.post("/book", bookFlight);
flightRouter.post("/search", searchFlights);
flightRouter.get("/touristFlights", searchFlights);
flightRouter.delete("/delete/:id", deleteFlightController);

export default flightRouter;
