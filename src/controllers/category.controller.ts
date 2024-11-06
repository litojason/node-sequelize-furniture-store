import { NextFunction, Request, Response } from "express";

import { Category, CategoryCreationAttributes } from "../models/category.model";
import { CustomError } from "../middlewares/errors";
import { Furniture } from "../models/furniture.model";

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.findAll();

    res.status(200).json({
      message: "Get categories successful.",
      categories,
    });
  } catch (error) {
    next(error);
  }
};

export const postCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, code, image } = req.body as CategoryCreationAttributes;

  try {
    const existedCategory = await Category.findOne({
      where: { code },
    });

    if (existedCategory) {
      throw new CustomError(400, "Category is already existed.");
    }

    const newCategory = await Category.create({
      name,
      code,
      image,
    });

    res.status(201).json({
      message: "Create category successful.",
      category: newCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.params;

  try {
    const categories = await Category.findByPk(categoryId, {
      include: {
        model: Furniture,
      },
    });

    res.status(200).json({
      message: "Get category items successful.",
      categories,
    });
  } catch (error) {
    next(error);
  }
};
