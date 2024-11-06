import { Router } from "express";

import * as categoryController from "../controllers/category.controller";

const categoryRouter = Router();

categoryRouter.get("/", categoryController.getCategories);
categoryRouter.post("/", categoryController.postCategory);
categoryRouter.get("/:categoryId", categoryController.getCategoryItems);

export default categoryRouter;
