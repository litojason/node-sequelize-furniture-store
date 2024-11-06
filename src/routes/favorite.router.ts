import { Router } from "express";

import { isAuthenticated } from "../middlewares/authentication";
import * as favoriteController from "../controllers/favorite.controller";

const favoriteRouter = Router();

favoriteRouter.get("/", isAuthenticated, favoriteController.getUserFavorites);

export default favoriteRouter;
