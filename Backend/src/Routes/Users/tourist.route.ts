import { Express, Router } from "express";

import {
	commentItinerary,
	commentTourGuide,
	rateItinerary, // rateProduct,
	rateTourGuide,
} from "../../Controllers/Interactions/tourist.interaction.controller";
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
touristRouter.post("/rateTourGuide", rateTourGuide);
touristRouter.post("/commentTourGuide", commentTourGuide);
// touristRouter.post("/rateProduct", rateProduct);
touristRouter.post("/rateItinerary", rateItinerary);
touristRouter.post("/commentItinerary", commentItinerary);
export default touristRouter;
Router;
