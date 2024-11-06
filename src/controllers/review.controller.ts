import { NextFunction, Response } from "express";

import { RequestWithUser } from "../middlewares/authentication";
import { User } from "../models/user.model";
import { Review } from "../models/review.model";
import { Furniture } from "../models/furniture.model";

export const getUserReviews = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;

  try {
    const { reviews } = await User.findByPk(userId, {
      include: {
        model: Review,
      },
    });

    res.status(200).json({
      message: "Get user reviews successful.",
      reviews,
    });
  } catch (error) {
    next(error);
  }
};
