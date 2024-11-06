import { NextFunction, Request, Response } from "express";

import { hashPassword, validatePassword } from "../lib/bcryptjs";
import { generateToken } from "../lib/jwt";
import { RequestWithUser } from "../middlewares/authentication";
import { CustomError } from "../middlewares/errors";
import {
  User,
  UserAttributes,
  UserCreationAttributes,
} from "../models/user.model";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.findAll();

    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body as UserAttributes;

  try {
    const existedUser = await User.scope("withPassword").findOne({
      where: { email },
      raw: true,
    });

    if (!existedUser)
      throw new CustomError(401, "Email or password is not valid.");

    if (!validatePassword(password, existedUser.password))
      throw new CustomError(401, "Email or password is not valid.");

    const token = generateToken(existedUser);

    existedUser.password = undefined;

    res.status(200).json({
      message: "Login successful.",
      user: { ...existedUser, token },
    });
  } catch (error) {
    next(error);
  }
};

export const postUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, name, phoneNumber, password } =
    req.body as UserCreationAttributes;

  try {
    const existedUser = await User.findOne({
      where: { email },
    });

    if (existedUser)
      throw new CustomError(
        400,
        "Email is already registered before. Please try with another email."
      );

    const newUser = await User.create({
      email,
      name,
      phoneNumber,
      password,
    });

    newUser.password = undefined;

    res.status(201).json({
      message: "User has been successfully registered!",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;

  try {
    const user = await User.findByPk(userId);

    res.status(200).json({
      message: "Get user profile successful.",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const editUserProfile = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { name, phoneNumber } = req.body as UserCreationAttributes;

  try {
    const user = await User.findByPk(userId);

    if (!user) throw new CustomError(404, "User not found.");

    const updatedUser = await user.update({ name, phoneNumber });

    res.status(200).json({
      message: "Edit user profile successful.",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req;
    const { currentPassword, newPassword } = req.body;

    const user = await User.scope("withPassword").findOne({
      where: {
        id: userId,
      },
    });

    if (!user) throw new CustomError(404, "User not found.");

    if (!validatePassword(currentPassword, user.password)) {
      throw new CustomError(401, "Password invalid.");
    }

    const hashedPassword = hashPassword(newPassword);

    const updatedUser = await user.update({ password: hashedPassword });

    updatedUser.password = undefined;

    res.status(200).json({
      message: "Change password successful.",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
