import { InferAttributes, InferCreationAttributes } from "sequelize";
import { AllowNull, Column, HasMany, Model, Table } from "sequelize-typescript";

import { FurnitureOption } from "./furnitureOption.model";

export interface ColorAttributeAttributes
  extends InferAttributes<ColorAttribute> {}
export interface ColorAttributeCreationAttributes
  extends InferCreationAttributes<ColorAttribute> {}
export interface ColorAttributeOutput
  extends Required<ColorAttributeAttributes> {}

@Table({
  modelName: "ColorAttribute",
  tableName: "colorAttributes",
  timestamps: true,
  paranoid: true,
})
export class ColorAttribute extends Model<
  ColorAttributeAttributes,
  ColorAttributeCreationAttributes
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
