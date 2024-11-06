import { Router } from "express";

import { isAuthenticated } from "../middlewares/authentication";
import * as cartController from "../controllers/cart.controller";

const cartRouter = Router();

cartRouter.get("/", isAuthenticated, cartController.getCartItems);
cartRouter.post("/", isAuthenticated, cartController.postCartItem);
cartRouter.delete(
  "/:cartId/cart-item/:cartItemId",
  isAuthenticated,
  cartController.deleteCartItem
);

export default cartRouter;
