import { Router } from "express";

import * as reviewController from "../../Controllers/Interactions/review.controller";

const reviewRouter = Router();

reviewRouter.post("/add", reviewController.postReview);
reviewRouter.get("/list", reviewController.listReviews);

export default reviewRouter;
