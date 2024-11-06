import { Router } from "express";

import { isAuthenticated } from "../middlewares/authentication";
import * as addressController from "../controllers/address.controller";

const addressRouter = Router();

addressRouter.get("/", isAuthenticated, addressController.getUserAddresses);
addressRouter.get(
  "/:addressId",
  isAuthenticated,
  addressController.getUserAddressById
);
addressRouter.post("/", isAuthenticated, addressController.postUserAddress);
addressRouter.put(
  "/:addressId",
  isAuthenticated,
  addressController.updateUserAddress
);
addressRouter.delete(
  "/:addressId",
  isAuthenticated,
  addressController.deleteUserAddress
);

export default addressRouter;
