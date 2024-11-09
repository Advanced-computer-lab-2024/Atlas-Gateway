import { Express, Router } from "express";

import {
	commentActivity,
	commentItinerary,
	commentTourGuide,
	rateActivity,
	rateItinerary,
	rateProduct,
	rateTourGuide,
	reviewProduct,
} from "../../Controllers/Interactions/tourist.interaction.controller";
import {
	createTourist,
	deleteTourist,
	getTourist,
	getTourists,
	redeemPoints,
	softDeleteTourist,
	updateTourist,
} from "../../Controllers/Users/tourist.controller";

const touristRouter = Router();
touristRouter.post("/create", createTourist);
touristRouter.get("/show/:id", getTourist);
touristRouter.get("/list", getTourists);
touristRouter.put("/update/:id", updateTourist);
touristRouter.put("/redeem/:id", redeemPoints);
touristRouter.delete("/delete/:id", deleteTourist);
touristRouter.post("/rateTourGuide", rateTourGuide);
touristRouter.post("/commentTourGuide", commentTourGuide);
touristRouter.post("/rateProduct", rateProduct);
touristRouter.post("/reviewProduct", reviewProduct);
touristRouter.post("/rateItinerary", rateItinerary);
touristRouter.post("/commentItinerary", commentItinerary);
touristRouter.post("/rateActivity", rateActivity);
touristRouter.post("/commentActivty", commentActivity);
touristRouter.delete("/requestDelete/:id", softDeleteTourist);
export default touristRouter;
Router;
