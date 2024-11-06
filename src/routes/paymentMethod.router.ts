import { Router } from "express";

import * as paymentMethodController from "../controllers/paymentMethod.controller";
import { isAuthenticated } from "../middlewares/authentication";

const paymentMethodRouter = Router();

paymentMethodRouter.get(
  "/",
  isAuthenticated,
  paymentMethodController.getUserPaymentMethods
);
paymentMethodRouter.get(
  "/:userPaymentMethodId",
  isAuthenticated,
  paymentMethodController.getUserCardById
);
paymentMethodRouter.post(
  "/",
  isAuthenticated,
  paymentMethodController.postUserPaymentMethod
);
paymentMethodRouter.put(
  "/:userPaymentMethodId",
  isAuthenticated,
  paymentMethodController.updateUserPaymentMethod
);
paymentMethodRouter.delete(
  "/:userPaymentMethodId",
  isAuthenticated,
  paymentMethodController.deleteUserPaymentMethod
);

export default paymentMethodRouter;
