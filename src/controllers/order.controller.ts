import { NextFunction, Response } from "express";

import { RequestWithUser } from "../middlewares/authentication";
import { User } from "../models/user.model";
import {
  DELIVERY_CHARGE,
  Order,
  OrderCreationAttributes,
} from "../models/order.model";
import { Cart } from "../models/cart.model";
import { CartItem } from "../models/cartItem.model";
import { FurnitureOption } from "../models/furnitureOption.model";
import {
  OrderItem,
  OrderItemCreationAttributes,
} from "../models/orderItem.model";
import { OrderAddress } from "../models/orderAddress.model";
import { Address } from "../models/address.model";
import { CustomError } from "../middlewares/errors";

export const getOrders = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;

  try {
    const { orders } = await User.findByPk(userId, {
      include: {
        model: Order.scope("list"),
      },
    });

    res.status(200).json({
      message: "Get orders successful.",
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { orderId } = req.params;

  try {
    const order = await Order.scope("fullDetails").findByPk(orderId);

    if (!order) throw new CustomError(404, "Order not found.");

    res.status(200).json({
      message: "Get order by id successful.",
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const postOrder = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { paymentMethodId } = req.body as OrderCreationAttributes;
  const { addressId } = req.body;

  try {
    const cart = await Cart.findOne({
      where: { userId },
      include: {
        model: CartItem,
        include: [{ model: FurnitureOption }],
      },
    });

    if (cart.cartItems.length === 0) {
      throw new CustomError(
        400,
        "Cart is empty. Please add item before placing order."
      );
    }

    const existedAddress = await Address.findByPk(addressId);

    if (!existedAddress) throw new CustomError(404, "Address not found.");

    const { name, address, province, city, postalCode, phoneNumber } =
      existedAddress;

    const orderAddress = await OrderAddress.findOne({
      where: { name, address, province, city, postalCode, phoneNumber },
    });

    let orderAddressId: number;

    if (orderAddress) {
      orderAddressId = orderAddress.id;
    } else {
      const newOrderAddress = await OrderAddress.create({
        name,
        address,
        province,
        city,
        postalCode,
        phoneNumber,
      });

      orderAddressId = newOrderAddress.id;
    }

    const totalItemsPrice = cart.cartItems.reduce(
      (previous, current) =>
        previous + current.quantity * current.furnitureOption.price,
      0
    );

    const deliveryCharge = DELIVERY_CHARGE;

    const totalPrice = totalItemsPrice + deliveryCharge;

    const newOrder = await Order.create({
      totalItemsPrice,
      deliveryCharge,
      totalPrice,
      userId,
      orderAddressId,
      // orderStatusId: 1,
      orderStatusId: 3, // TODO: set order status to Pending, currently Order Status is Complete
      paymentMethodId,
    });

    const newOrderItems: OrderItemCreationAttributes[] = cart.cartItems.map(
      (cartItem) => ({
        quantity: cartItem.quantity,
        price: cartItem.furnitureOption.price,
        orderId: newOrder.id,
        furnitureOptionId: cartItem.furnitureOptionId,
      })
    );

    const orderItems = await OrderItem.bulkCreate(newOrderItems);

    await newOrder.$add("orderItems", orderItems);

    await cart.$set("cartItems", []);

    const order = await Order.findByPk(newOrder.id, {
      include: [
        {
          model: OrderItem,
          include: [{ model: FurnitureOption }],
        },
      ],
    });

    res.status(200).json({
      message: "Create new order successful.",
      order,
    });
  } catch (error) {
    next(error);
  }
};
