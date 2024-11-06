import { InferAttributes, InferCreationAttributes } from "sequelize";
import { AllowNull, Column, HasMany, Model, Table } from "sequelize-typescript";

import { Furniture } from "./furniture.model";

export interface DiscountAttributes extends InferAttributes<Discount> {}
export interface DiscountCreationAttributes
  extends InferCreationAttributes<Discount> {}
export interface DiscountOutput extends Required<DiscountAttributes> {}

@Table({
  modelName: "Discount",
  tableName: "discounts",
  timestamps: true,
  paranoid: true,
})
export class Discount extends Model<
  DiscountAttributes,
  DiscountCreationAttributes
> {
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  description: string;

  @AllowNull(false)
  @Column
  percentage: number;

  @AllowNull(false)
  @Column
  isActive: boolean;

  @HasMany(() => Furniture)
  furnitures?: Furniture[];
}
