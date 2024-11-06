import { NextFunction, Response } from "express";

import { CustomError } from "../middlewares/errors";
import { RequestWithUser } from "../middlewares/authentication";
import { User } from "../models/user.model";
import {
  UserPaymentMethod,
  UserPaymentMethodCreationAttributes,
} from "../models/userPaymentMethod.model";

export const getUserPaymentMethods = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;

  try {
    const { paymentMethods } = await User.findByPk(userId, {
      include: {
        model: UserPaymentMethod,
      },
    });

    res.status(200).json({
      message: "Get user payment methods successful.",
      paymentMethods,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserCardById = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { userPaymentMethodId } = req.params;

  try {
    const userPaymentMethod = await UserPaymentMethod.findByPk(
      userPaymentMethodId
    );

    if (!userPaymentMethod)
      throw new CustomError(404, "User payment method not found.");
    if (userPaymentMethod.userId !== userId)
      throw new CustomError(403, "Forbidden to get other user payment method.");

    res.status(200).json({
      message: "Get user payment methods successful.",
      paymentMethod: userPaymentMethod,
    });
  } catch (error) {
    next(error);
  }
};

export const postUserPaymentMethod = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { cardNumber, expirationDate, cvc, paymentMethodId } =
    req.body as UserPaymentMethodCreationAttributes;

  try {
    const existedUserPaymentMethod = await UserPaymentMethod.findOne({
      where: { userId, cardNumber },
    });

    if (existedUserPaymentMethod) {
      throw new CustomError(
        400,
        "Card is already added before. Please use another card."
      );
    }

    const newUserPaymentMethod = await UserPaymentMethod.create({
      cardNumber,
      expirationDate,
      cvc,
      paymentMethodId,
      userId,
    });

    res.status(201).json({
      message: "Create new user payment method successful.",
      paymentMethod: newUserPaymentMethod,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserPaymentMethod = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { userPaymentMethodId } = req.params;
  const { cardNumber, expirationDate, cvc } =
    req.body as UserPaymentMethodCreationAttributes;

  try {
    const existedUserPaymentMethod = await UserPaymentMethod.findByPk(
      +userPaymentMethodId
    );

    if (!existedUserPaymentMethod) {
      throw new CustomError(404, "Card not found.");
    }
    if (existedUserPaymentMethod.userId !== userId) {
      throw new CustomError(
        403,
        "Forbidden to update other user payment method."
      );
    }

    // If updated card number is changed, check if new card number
    // has duplicated usedId in the server.
    if (existedUserPaymentMethod.cardNumber !== cardNumber) {
      const existedCardNumber = await UserPaymentMethod.findOne({
        where: { userId, cardNumber },
      });

      if (existedCardNumber) {
        throw new CustomError(400, "Card number is already existed.");
      }
    }

    const updatedUserPaymentMethod = await existedUserPaymentMethod.update({
      cardNumber,
      expirationDate,
      cvc,
    });

    res.status(200).json({
      message: "Update user payment method successful.",
      paymentMethod: updatedUserPaymentMethod,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserPaymentMethod = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { userPaymentMethodId } = req.params;

  try {
    const existedUserPaymentMethod = await UserPaymentMethod.findByPk(
      userPaymentMethodId
    );

    if (!existedUserPaymentMethod)
      throw new CustomError(404, "Card not found.");
    if (existedUserPaymentMethod.userId !== userId)
      throw new CustomError(
        403,
        "Forbidden to delete other user payment method."
      );

    await existedUserPaymentMethod.destroy();

    res.status(200).json({
      message: "Delete user payment method successful.",
    });
  } catch (error) {
    next(error);
  }
};
