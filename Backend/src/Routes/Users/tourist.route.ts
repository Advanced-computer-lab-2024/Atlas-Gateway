import { Router } from "express";

import {
	addProductToCart,
	createTourist,
	deleteTourist,
	getTourist,
	getTourists,
	redeemPoints,
	removeProductFromCart,
	requestActivityNotification,
	requestItineraryNotification,
	softDeleteTourist,
	updateProductQuantity,
	updateTourist,
	viewPastActivities,
	viewPastItineraries,
	viewUpcomingActivities,
	viewUpcomingItineraries,
	viewWallet,
} from "../../Controllers/Users/tourist.controller";

const touristRouter = Router();
touristRouter.post("/create", createTourist);
touristRouter.get("/show/:id", getTourist);
touristRouter.get("/list", getTourists);
touristRouter.put("/update/:id", updateTourist);
touristRouter.put("/redeem/:id", redeemPoints);
touristRouter.delete("/delete/:id", deleteTourist);
touristRouter.delete("/requestDelete/:id", softDeleteTourist);
touristRouter.get("/wallet", viewWallet);
touristRouter.get("/upcomingActivities/:id", viewUpcomingActivities);
touristRouter.get("/upcomingItineraries/:id", viewUpcomingItineraries);
touristRouter.get("/pastActivities/:id", viewPastActivities);
touristRouter.get("/pastItineraries/:id", viewPastItineraries);
touristRouter.post("/ItineraryNotification", requestItineraryNotification);
touristRouter.post("/ActivityNotification", requestActivityNotification);
touristRouter.post("/cart/add/:id", addProductToCart);
touristRouter.delete("/cart/remove/:id", removeProductFromCart);
touristRouter.put("/cart/update/:id", updateProductQuantity);

export default touristRouter;
