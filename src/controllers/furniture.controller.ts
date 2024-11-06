import { NextFunction, Response } from "express";
import { Op } from "sequelize";

import { RequestWithUser } from "../middlewares/authentication";
import {
  Furniture,
  FurnitureCreationAttributes,
} from "../models/furniture.model";
import { Category } from "../models/category.model";
import { FurnitureOption } from "../models/furnitureOption.model";
import { ColorAttribute } from "../models/colorAttribute.model";
import { SizeAttribute } from "../models/sizeAttribute.model";
import { Favorite, FavoriteCreationAttributes } from "../models/favorite.model";
import { User } from "../models/user.model";
import { Review } from "../models/review.model";

export const getFurnitures = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { categoryId, search } = req.query;

  let searchQuery = {};

  if (categoryId) searchQuery["categoryId"] = +categoryId;
  if (search) {
    searchQuery["name"] = {
      [Op.like]: `%${search}%`,
    };
  }

  try {
    const furnitures = await Furniture.findAll({
      where: searchQuery,
      include: [
        { model: Category },
        { model: FurnitureOption },
        // { model: User },
      ],
    });

    res.status(200).json({
      message: "Get furnitures successful.",
      furnitures,
    });
  } catch (error) {
    next(error);
  }
};

export const postFurniture = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { name, description, image, categoryId, discountId } =
    req.body as FurnitureCreationAttributes;

  try {
    const newFurniture = await Furniture.create({
      name,
      description,
      image,
      categoryId,
      discountId,
    });

    res.status(201).json({
      message: "Create furniture successful.",
      furniture: newFurniture,
    });
  } catch (error) {
    next(error);
  }
};

export const getFurnitureById = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { furnitureId } = req.params;

  try {
    const furniture = await Furniture.findByPk(furnitureId, {
      include: [
        { model: Category },
        {
          model: FurnitureOption,
          include: [ColorAttribute, SizeAttribute],
        },
      ],
    });

    res.status(200).json({
      message: "Get furniture by id successful.",
      furniture,
    });
  } catch (error) {
    next(error);
  }
};

export const postUserFavorite = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { furnitureId: furnitureIdParam } = req.params;
  const { isFavorite } = req.body;

  const furnitureId = +furnitureIdParam;

  try {
    const existedFavorite = await Favorite.findOne({
      where: {
        [Op.and]: [{ userId, furnitureId }],
      },
    });

    // If favorite is not existed and user set favorite to true,
    // create favorite
    if (!existedFavorite && isFavorite) {
      const newFavorite = await Favorite.create({
        userId,
        furnitureId,
      });

      res.status(201).json({
        message: "Create favorite successful.",
        favorite: newFavorite,
      });
      return;
    }

    if (!isFavorite) await existedFavorite.destroy();

    res.status(200).json({
      message: "Update favorite successful.",
    });
  } catch (error) {
    next(error);
  }
};

export const getFurnitureReviews = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { furnitureId } = req.params;

  try {
    const { reviews } = await Furniture.findByPk(furnitureId, {
      include: {
        model: Review,
      },
    });

    res.status(200).json({
      message: "Get furniture reviews successful.",
      reviews,
    });
  } catch (error) {
    next(error);
  }
};
