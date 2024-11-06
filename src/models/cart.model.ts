import { InferAttributes, InferCreationAttributes } from "sequelize";
import {
  BelongsTo,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";

import { User } from "./user.model";
import { CartItem } from "./cartItem.model";

export interface CartAttributes extends InferAttributes<Cart> {}
export interface CartCreationAttributes extends InferCreationAttributes<Cart> {}
export interface CartOutput extends Required<CartAttributes> {}

@Table({
  modelName: "Cart",
  tableName: "carts",
  timestamps: true,
  paranoid: true,
})
export class Cart extends Model<CartAttributes, CartCreationAttributes> {
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user?: User;

  @HasMany(() => CartItem)
  cartItems?: CartItem[];
}
