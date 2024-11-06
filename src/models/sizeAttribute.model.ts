import { InferAttributes, InferCreationAttributes } from "sequelize";
import { AllowNull, Column, HasMany, Model, Table } from "sequelize-typescript";

import { FurnitureOption } from "./furnitureOption.model";

export interface SizeAttributeAttributes
  extends InferAttributes<SizeAttribute> {}
export interface SizeAttributeCreationAttributes
  extends InferCreationAttributes<SizeAttribute> {}
export interface SizeAttributeOutput
  extends Required<SizeAttributeAttributes> {}

@Table({
  modelName: "SizeAttribute",
  tableName: "sizeAttributes",
  timestamps: true,
  paranoid: true,
})
export class SizeAttribute extends Model<
  SizeAttributeAttributes,
  SizeAttributeCreationAttributes
> {
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  value: string;

  @AllowNull(false)
  @Column
  code: string;

  @HasMany(() => FurnitureOption)
  furnitureOptions?: FurnitureOption[];
}
