import { InferAttributes, InferCreationAttributes } from "sequelize";
import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Scopes,
  Table,
} from "sequelize-typescript";

import { User } from "./user.model";
import { OrderItem } from "./orderItem.model";
import { OrderStatus } from "./orderStatus.model";
import { PaymentMethod } from "./paymentMethod.model";
import { FurnitureOption } from "./furnitureOption.model";
import { OrderAddress } from "./orderAddress.model";

export interface OrderAttributes extends InferAttributes<Order> {}
export interface OrderCreationAttributes
  extends InferCreationAttributes<Order> {}
export interface OrderOutput extends Required<OrderAttributes> {}

@Scopes(() => ({
  list: {
    include: [
      { model: OrderStatus },
      { model: PaymentMethod },
      {
        model: OrderItem,
        include: [
          {
            model: FurnitureOption.scope("fullDetails"),
          },
        ],
      },
    ],
  },
  fullDetails: {
    include: [
      { model: OrderStatus },
      { model: PaymentMethod },
      {
        model: OrderItem,
        include: [
          {
            model: FurnitureOption.scope("fullDetails"),
          },
        ],
      },
      { model: OrderAddress },
    ],
  },
}))
@Table({
  modelName: "Order",
  tableName: "orders",
  timestamps: true,
  paranoid: true,
})
export class Order extends Model<OrderAttributes, OrderCreationAttributes> {
  @AllowNull(false)
  @Column
  totalItemsPrice: number;

  @AllowNull(false)
  @Column
  deliveryCharge: number;

  @AllowNull(false)
  @Column
  totalPrice: number;

  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => OrderAddress)
  orderAddressId: number;

  @BelongsTo(() => OrderAddress)
  orderAddress: OrderAddress;

  @ForeignKey(() => OrderStatus)
  orderStatusId: number;

  @BelongsTo(() => OrderStatus)
  orderStatus: OrderStatus;

  @ForeignKey(() => PaymentMethod)
  paymentMethodId: number;

  @BelongsTo(() => PaymentMethod)
  paymentMethod: PaymentMethod;

  @HasMany(() => OrderItem)
  orderItems?: OrderItem[];
}

export const DELIVERY_CHARGE = 10;
