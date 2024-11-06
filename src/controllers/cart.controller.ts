import { NextFunction, Response } from "express";

import { RequestWithUser } from "../middlewares/authentication";
import { CustomError } from "../middlewares/errors";
import { Cart } from "../models/cart.model";
import { CartItem, CartItemCreationAttributes } from "../models/cartItem.model";
import { FurnitureOption } from "../models/furnitureOption.model";
import { User } from "../models/user.model";
import { DELIVERY_CHARGE } from "../models/order.model";

export const getCartItems = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;

  try {
    const cart = await Cart.findOne({
      where: { userId },
      include: {
        model: CartItem,
        include: [
          {
            model: FurnitureOption.scope("fullDetails"),
          },
        ],
      },
    });

    const totalItemsPrice = cart.cartItems.reduce(
      (previous, current) =>
        previous + current.quantity * current.furnitureOption.price,
      0
    );

    // for simplicity, delivery charge will be a constant set from server
    const deliveryCharge = DELIVERY_CHARGE;

    const totalPrice = totalItemsPrice + deliveryCharge;

    res.status(200).json({
      message: "Get cart items successful.",
      cartId: cart.id,
      cartItems: cart.cartItems,
      totalItemsPrice,
      deliveryCharge,
      totalPrice,
    });
  } catch (error) {
    next(error);
  }
};

export const postCartItem = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { furnitureOptionId, quantity } =
    req.body as CartItemCreationAttributes;

  try {
    let cart: Cart;
    let cartItems: CartItem[];
    let cartItem: CartItem;
    let message: string;

    cart = await Cart.findOne({
      where: { userId },
    });

    // if cart has not existed in database,
    // create first and give cartItems = []
    // otherwise get cartItems by furnitureOptionId from database
    if (!cart) {
      cart = await Cart.create({ userId });
      cartItems = [];
    } else {
      cartItems = await cart.$get("cartItems", {
        where: { furnitureOptionId },
      });
    }

    // if cartItems is empty,
    // create new CartItem
    // otherwise update quantity in database
    if (cartItems.length === 0) {
      message = "Add new cart item successful.";
      cartItem = await CartItem.create({
        cartId: cart.id,
        furnitureOptionId: +furnitureOptionId,
        quantity: 1,
      });
    } else {
      message = "Update cart item successful.";
      cartItem = await cartItems[0].update({ quantity });
    }

    res.status(200).json({
      message,
      cartItem,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCartItem = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { cartId, cartItemId } = req.params;

  try {
    const { cart } = await User.findByPk(userId, {
      include: {
        model: Cart,
      },
    });

    if (!cart) throw new CustomError(404, "Cart not found.");
    if (cart.id !== +cartId)
      throw new CustomError(400, "Cart is not belong to user.");

    const cartItem = await CartItem.findByPk(+cartItemId);

    if (!cartItem) throw new CustomError(400, "Cart item not found.");

    await cartItem.destroy();

    res.status(200).json({
      message: "Delete cart item successful.",
    });
  } catch (error) {
    next(error);
  }
};
