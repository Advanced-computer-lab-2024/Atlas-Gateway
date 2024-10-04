import { Express,Router } from "express";
import {getTourist,createTourist,getTouristInfo,updateTouristInfo} from "../../Controllers/Users/tourist.controller"

const touristRouter=Router();
touristRouter.get("/list",getTourist)
touristRouter.post("/create",createTourist)
touristRouter.get("/info/:id",getTouristInfo)
touristRouter.put("/update/:id",updateTouristInfo)
export default touristRouter;
