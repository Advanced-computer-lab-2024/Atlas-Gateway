import { Router } from "express";

import { searchHotelOffersController } from "../../Controllers/Hotel/hotel.controller";

const router = Router();

router.post("/list", searchHotelOffersController);

export default router;
