import { Router } from "express";

import * as userController from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/authentication";

const userRouter = Router();

userRouter.get("/", userController.getUsers);
userRouter.post("/login", userController.postLogin);
userRouter.post("/register", userController.postUser);

userRouter.get("/profile", isAuthenticated, userController.getUserProfile);
userRouter.put("/profile", isAuthenticated, userController.editUserProfile);
userRouter.put(
  "/profile/password",
  isAuthenticated,
  userController.changePassword
);

export default userRouter;
