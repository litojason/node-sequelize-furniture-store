import { Router } from "express";

import { isAuthenticated } from "../middlewares/authentication";
import * as orderController from "../controllers/order.controller";

const orderRouter = Router();

orderRouter.get("/", isAuthenticated, orderController.getOrders);
orderRouter.get("/:orderId", isAuthenticated, orderController.getOrderById);
orderRouter.post("/", isAuthenticated, orderController.postOrder);

export default orderRouter;
