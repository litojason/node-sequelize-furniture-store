import { Router } from "express";

import * as furnitureOptionController from "../controllers/furnitureOptions.controller";

const furnitureOptionRouter = Router();

furnitureOptionRouter.get("/", furnitureOptionController.getFurnitureOptions);
furnitureOptionRouter.post("/", furnitureOptionController.postFurnitureOption);

export default furnitureOptionRouter;
