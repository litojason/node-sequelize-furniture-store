import { Router } from "express";

import * as attributeRouterController from "../controllers/attribute.controller";

const attributeRouter = Router();

// COLOR
attributeRouter.get("/colors", attributeRouterController.getColorAttributes);
attributeRouter.post("/colors", attributeRouterController.postColorAttribute);

// SIZE
attributeRouter.get("/sizes", attributeRouterController.getSizeAttributes);
attributeRouter.post("/sizes", attributeRouterController.postSizeAttribute);

export default attributeRouter;
