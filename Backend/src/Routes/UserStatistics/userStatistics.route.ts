import { Router } from "express";

import { viewNumberOfUser } from "../../Controllers/UserStatistics/userStatistics.controller";

const userStatiticsRouter = Router();
userStatiticsRouter.get("/list", viewNumberOfUser);
export default userStatiticsRouter;
