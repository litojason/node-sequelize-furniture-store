import { NextFunction, Response } from "express";

import { RequestWithUser } from "../middlewares/authentication";
import { User } from "../models/user.model";
import { Favorite } from "../models/favorite.model";
import { Furniture } from "../models/furniture.model";
import { Category } from "../models/category.model";
import { FurnitureOption } from "../models/furnitureOption.model";

export const getUserFavorites = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;

  try {
    const { favorites } = await User.findByPk(userId, {
      include: [
        {
          model: Favorite,
          include: [
            {
              model: Furniture,
              include: [{ model: Category }, { model: FurnitureOption }],
            },
          ],
        },
      ],
    });

    res.status(200).json({
      message: "Get user favorites successful.",
      favorites,
    });
  } catch (error) {
    next(error);
  }
};
