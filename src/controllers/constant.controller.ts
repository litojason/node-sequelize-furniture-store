import { NextFunction, Request, Response } from "express";

import { PaymentMethod } from "../models/paymentMethod.model";
import { OrderStatus } from "../models/orderStatus.model";
import { PopularSearch } from "../models/popularSearch.model";

export const getPaymentMethods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paymentMethods = await PaymentMethod.findAll();

    res.status(200).json({
      message: "Get payment methods constant successful.",
      paymentMethods,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderStatuses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderStatuses = await OrderStatus.findAll();

    res.status(200).json({
      message: "Get order statuses constant successful.",
      orderStatuses,
    });
  } catch (error) {
    next(error);
  }
};

export const getPopularSearches = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const popularSearches = await PopularSearch.findAll();

    res.status(200).json({
      message: "Get popular searches constant successful.",
      popularSearches,
    });
  } catch (error) {
    next(error);
  }
};
