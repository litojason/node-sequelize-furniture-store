import { InferAttributes, InferCreationAttributes } from "sequelize";
import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

import { Cart } from "./cart.model";
import { FurnitureOption } from "./furnitureOption.model";

export interface CartItemAttributes extends InferAttributes<CartItem> {}
export interface CartItemCreationAttributes
  extends InferCreationAttributes<CartItem> {}
export interface CartItemOutput extends Required<CartItemAttributes> {}

@Table({
  modelName: "CartItem",
  tableName: "cartItems",
  timestamps: true,
  // paranoid: true,
})
export class CartItem extends Model<
  CartItemAttributes,
  CartItemCreationAttributes
> {
  @AllowNull(false)
  @Column
  quantity: number;

  @ForeignKey(() => Cart)
  cartId: number;

  @BelongsTo(() => Cart)
  cart: Cart;

  @ForeignKey(() => FurnitureOption)
  furnitureOptionId: number;

  @BelongsTo(() => FurnitureOption)
  furnitureOption: FurnitureOption;
}
