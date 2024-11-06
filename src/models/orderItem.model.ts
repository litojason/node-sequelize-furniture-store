import { InferAttributes, InferCreationAttributes } from "sequelize";
import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

import { Order } from "./order.model";
import { FurnitureOption } from "./furnitureOption.model";

export interface OrderItemAttributes extends InferAttributes<OrderItem> {}
export interface OrderItemCreationAttributes
  extends InferCreationAttributes<OrderItem> {}
export interface OrderItemOutput extends Required<OrderItemAttributes> {}

@Table({
  modelName: "OrderItem",
  tableName: "orderItems",
  timestamps: true,
  paranoid: true,
})
export class OrderItem extends Model<
  OrderItemAttributes,
  OrderItemCreationAttributes
> {
  @AllowNull(false)
  @Column
  quantity: number;

  @AllowNull(false)
  @Column
  price: number;

  @ForeignKey(() => Order)
  orderId: number;

  @BelongsTo(() => Order)
  order?: Order;

  @ForeignKey(() => FurnitureOption)
  furnitureOptionId: number;

  @BelongsTo(() => FurnitureOption)
  furnitureOption?: FurnitureOption;
}
