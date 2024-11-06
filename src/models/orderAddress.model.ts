import { InferAttributes, InferCreationAttributes } from "sequelize";
import { AllowNull, Column, HasMany, Model, Table } from "sequelize-typescript";

import { Order } from "./order.model";

export interface OrderAddressAttributes extends InferAttributes<OrderAddress> {}
export interface OrderAddressCreationAttributes
  extends InferCreationAttributes<OrderAddress> {}
export interface OrderAddressOutput extends Required<OrderAddressAttributes> {}

@Table({
  modelName: "OrderAddress",
  tableName: "orderAddresses",
  timestamps: true,
})
export class OrderAddress extends Model<
  OrderAddressAttributes,
  OrderAddressCreationAttributes
> {
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  address: string;

  @AllowNull(false)
  @Column
  province: string;

  @AllowNull(false)
  @Column
  city: string;

  @AllowNull(false)
  @Column
  postalCode: string;

  @AllowNull(false)
  @Column
  phoneNumber: string;

  @HasMany(() => Order)
  orders: Order[];
}
