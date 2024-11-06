import { Router } from "express";

import { isAuthenticated } from "../middlewares/authentication";
import * as furnitureController from "../controllers/furniture.controller";

const furnitureRouter = Router();

furnitureRouter.get("/", furnitureController.getFurnitures);
furnitureRouter.post("/", furnitureController.postFurniture);
furnitureRouter.get("/:furnitureId", furnitureController.getFurnitureById);
furnitureRouter.post(
  "/:furnitureId/favorite",
  isAuthenticated,
  furnitureController.postUserFavorite
);
furnitureRouter.get(
  "/:furnitureId/reviews",
  furnitureController.getFurnitureReviews
);

export default furnitureRouter;
