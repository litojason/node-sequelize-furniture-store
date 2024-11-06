import { NextFunction, Response } from "express";

import { RequestWithUser } from "../middlewares/authentication";
import { CustomError } from "../middlewares/errors";
import { User } from "../models/user.model";
import { Address, AddressCreationAttributes } from "../models/address.model";

export const getUserAddresses = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;

  try {
    const { addresses } = await User.findByPk(userId, {
      include: {
        model: Address,
      },
    });

    res.status(200).json({
      message: "Get user addresses successful.",
      addresses,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserAddressById = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { addressId } = req.params;

  try {
    const address = await Address.findByPk(addressId);

    if (!address) throw new CustomError(404, "User address not found.");
    if (address.userId !== +userId)
      throw new CustomError(403, "Forbidden to get other user address.");

    res.status(200).json({
      message: "Get user address by id successful.",
      address,
    });
  } catch (error) {
    next(error);
  }
};

export const postUserAddress = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { name, address, province, city, phoneNumber, postalCode } =
    req.body as AddressCreationAttributes;

  try {
    const newAddress = await Address.create({
      name,
      address,
      province,
      city,
      phoneNumber,
      postalCode,
      userId,
    });

    res.status(201).json({
      message: "Create user address successful.",
      address: newAddress,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserAddress = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { addressId } = req.params;
  const { name, address, province, city, phoneNumber, postalCode } =
    req.body as AddressCreationAttributes;

  try {
    const existedAddress = await Address.findByPk(addressId);

    if (!existedAddress) throw new CustomError(404, "Address not found.");
    if (existedAddress.userId !== +userId)
      throw new CustomError(403, "Forbidden to update other user address.");

    const updatedAddress = await existedAddress.update({
      name,
      address,
      province,
      city,
      phoneNumber,
      postalCode,
      userId,
    });

    res.status(200).json({
      message: "Update user address successful.",
      address: updatedAddress,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserAddress = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { addressId } = req.params;

  try {
    const existedAddress = await Address.findByPk(addressId);

    if (!existedAddress) throw new CustomError(404, "User address not found.");
    if (existedAddress.userId !== +userId)
      throw new CustomError(403, "Forbidden to delete other user address.");

    await existedAddress.destroy();

    res.status(200).json({
      message: "Delete user address successful.",
    });
  } catch (error) {
    next(error);
  }
};
