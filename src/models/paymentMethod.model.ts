import { InferAttributes, InferCreationAttributes } from "sequelize";
import { AllowNull, Column, HasMany, Model, Table } from "sequelize-typescript";
import { UserPaymentMethod } from "./userPaymentMethod.model";

export interface PaymentMethodAttributes
  extends InferAttributes<PaymentMethod> {}
export interface PaymentMethodCreationAttributes
  extends InferCreationAttributes<PaymentMethod> {}
export interface PaymentMethodOutput
  extends Required<PaymentMethodAttributes> {}

@Table({
  modelName: "PaymentMethod",
  tableName: "paymentMethods",
  timestamps: true,
  paranoid: true,
})
export class PaymentMethod extends Model<
  PaymentMethodAttributes,
  PaymentMethodCreationAttributes
> {
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  value: string;

  @HasMany(() => UserPaymentMethod)
  userPaymentMethods?: UserPaymentMethod[];
}
