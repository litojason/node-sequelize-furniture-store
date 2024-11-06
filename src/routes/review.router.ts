import { Router } from "express";

import { isAuthenticated } from "../middlewares/authentication";
import * as routerController from "../controllers/review.controller";

const reviewRouter = Router();

reviewRouter.get("/", isAuthenticated, routerController.getUserReviews);

export default reviewRouter;
