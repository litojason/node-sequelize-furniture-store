import { InferAttributes, InferCreationAttributes } from "sequelize";
import {
  AllowNull,
  BeforeCreate,
  Column,
  DefaultScope,
  HasMany,
  HasOne,
  Model,
  Scopes,
  Table,
  Unique,
} from "sequelize-typescript";

import { hashPassword } from "../lib/bcryptjs";
import { Cart } from "./cart.model";
import { Address } from "./address.model";
import { Favorite } from "./favorite.model";
import { Order } from "./order.model";
import { Review } from "./review.model";
import { UserPaymentMethod } from "./userPaymentMethod.model";

export interface UserAttributes extends InferAttributes<User> {}
export interface UserCreationAttributes extends InferCreationAttributes<User> {}
export interface UserOutput extends Required<UserAttributes> {}

@DefaultScope(() => ({
  attributes: { exclude: ["password"] },
}))
@Scopes(() => ({
  withPassword: {
    attributes: { include: ["password"] },
  },
}))
@Table({
  modelName: "User",
  tableName: "users",
  timestamps: true,
  paranoid: true,
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @AllowNull(false)
  // @Unique
  @Column
  email: string;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  phoneNumber: string;

  @AllowNull(false)
  @Column
  password: string;

  @HasMany(() => UserPaymentMethod)
  paymentMethods?: UserPaymentMethod[];

  @HasMany(() => Address)
  addresses?: Address[];

  @HasMany(() => Favorite)
  favorites?: Favorite[];

  @HasOne(() => Cart)
  cart?: Cart;

  @HasMany(() => Order)
  orders?: Order[];

  @HasMany(() => Review)
  reviews?: Review[];

  @BeforeCreate
  static hashedPassword(instance: User) {
    instance.password = hashPassword(instance.password);
  }
}
