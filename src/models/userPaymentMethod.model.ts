import { InferAttributes, InferCreationAttributes } from "sequelize";
import {
  AllowNull,
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";

import { User } from "./user.model";
import { PaymentMethod } from "./paymentMethod.model";

export interface UserPaymentMethodAttributes
  extends InferAttributes<UserPaymentMethod> {}
export interface UserPaymentMethodCreationAttributes
  extends InferCreationAttributes<UserPaymentMethod> {}
export interface UserPaymentMethodOutput
  extends Required<UserPaymentMethodAttributes> {}

@Table({
  modelName: "UserPaymentMethod",
  tableName: "userPaymentMethods",
  timestamps: true,
  //   paranoid: true,
})
export class UserPaymentMethod extends Model<
  UserPaymentMethodAttributes,
  UserPaymentMethodCreationAttributes
> {
  @AllowNull(false)
  @Column
  cardNumber: string;

  @AllowNull(false)
  @Column
  expirationDate: string;

  @AllowNull(false)
  @Column
  cvc: string;

  @AllowNull(false)
  @Default(false)
  @Column
  isDefault: boolean;

  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user?: User;

  @ForeignKey(() => PaymentMethod)
  paymentMethodId: number;

  @BelongsTo(() => PaymentMethod)
  paymentMethod?: PaymentMethod;
}
