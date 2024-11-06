import { InferAttributes, InferCreationAttributes } from "sequelize";
import { AllowNull, Column, HasMany, Model, Table } from "sequelize-typescript";

import { FurnitureOption } from "./furnitureOption.model";
import { Order } from "./order.model";

export interface OrderStatusAttributes extends InferAttributes<OrderStatus> {}
export interface OrderStatusCreationAttributes
  extends InferCreationAttributes<OrderStatus> {}
export interface OrderStatusOutput extends Required<OrderStatusAttributes> {}

@Table({
  modelName: "OrderStatus",
  tableName: "orderStatuses",
  timestamps: true,
})
export class OrderStatus extends Model<
  OrderStatusAttributes,
  OrderStatusCreationAttributes
> {
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  value: string;

  @HasMany(() => Order)
  orders?: Order[];
}

export enum OrderStatuses {
  PENDING = "Pending",
  SHIPPED = "Shipped",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}
