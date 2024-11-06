import { NextFunction, Response } from "express";

import { RequestWithUser } from "../middlewares/authentication";
import { CustomError } from "../middlewares/errors";
import {
  ColorAttribute,
  ColorAttributeCreationAttributes,
} from "../models/colorAttribute.model";
import {
  SizeAttribute,
  SizeAttributeCreationAttributes,
} from "../models/sizeAttribute.model";

// COLOR
export const getColorAttributes = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const colorAttributes = await ColorAttribute.findAll();

    res.status(200).json({
      message: "Get color attributes successful.",
      colorAttributes,
    });
  } catch (error) {
    next(error);
  }
};

export const postColorAttribute = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { name, value, code } = req.body as ColorAttributeCreationAttributes;

  try {
    const existedColorAttribute = await ColorAttribute.findOne({
      where: { code },
    });

    if (existedColorAttribute)
      throw new CustomError(400, "Color is already existed.");

    const newColorAttribute = await ColorAttribute.create({
      name,
      value,
      code,
    });

    res.status(201).json({
      message: "Create color attribute successful.",
      colorAttribute: newColorAttribute,
    });
  } catch (error) {
    next(error);
  }
};

// SIZE
export const getSizeAttributes = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const sizeAttributes = await SizeAttribute.findAll();

    res.status(200).json({
      message: "Get size attributes successful.",
      sizeAttributes,
    });
  } catch (error) {
    next(error);
  }
};

export const postSizeAttribute = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { name, value, code } = req.body as SizeAttributeCreationAttributes;

  try {
    const existedSizeAttribute = await SizeAttribute.findOne({
      where: { code },
    });

    if (existedSizeAttribute)
      throw new CustomError(400, "Size is already existed.");

    const newSizeAttribute = await SizeAttribute.create({
      name,
      value,
      code,
    });

    res.status(201).json({
      message: "Create size attribute successful.",
      sizeAttribute: newSizeAttribute,
    });
  } catch (error) {
    next(error);
  }
};
