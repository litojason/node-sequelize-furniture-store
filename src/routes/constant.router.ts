import { Router } from "express";

import * as constantController from "../controllers/constant.controller";

const constantRouter = Router();

constantRouter.get("/payment-methods", constantController.getPaymentMethods);
constantRouter.get("/order-statuses", constantController.getOrderStatuses);
constantRouter.get("/popular-searches", constantController.getPopularSearches);

export default constantRouter;
