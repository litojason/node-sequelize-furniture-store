import { NextFunction, Response } from "express";

import { RequestWithUser } from "../middlewares/authentication";
import {
  FurnitureOption,
  FurnitureOptionCreationAttributes,
} from "../models/furnitureOption.model";

export const getFurnitureOptions = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const furnitureOptions = await FurnitureOption.findAll();

    res.status(200).json({
      message: "Get furniture options successful.",
      furnitureOptions,
    });
  } catch (error) {
    next(error);
  }
};

export const postFurnitureOption = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const {
    sku,
    price,
    quantity,
    image,
    furnitureId,
    colorAttributeId,
    sizeAttributeId,
  } = req.body as FurnitureOptionCreationAttributes;

  try {
    const newFurnitureOption = await FurnitureOption.create({
      sku,
      price,
      quantity,
      image,
      furnitureId,
      colorAttributeId,
      sizeAttributeId,
    });

    res.status(201).json({
      message: "Create furniture option successful.",
      furnitureOption: newFurnitureOption,
    });
  } catch (error) {
    next(error);
  }
};
