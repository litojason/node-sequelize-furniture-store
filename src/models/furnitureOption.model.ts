import { InferAttributes, InferCreationAttributes } from "sequelize";
import {
  AllowNull,
  BeforeCreate,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Scopes,
  Table,
} from "sequelize-typescript";

import { Furniture } from "./furniture.model";
import { ColorAttribute } from "./colorAttribute.model";
import { SizeAttribute } from "./sizeAttribute.model";
import { Category } from "./category.model";

export interface FurnitureOptionAttributes
  extends InferAttributes<FurnitureOption> {}
export interface FurnitureOptionCreationAttributes
  extends InferCreationAttributes<FurnitureOption> {}
export interface FurnitureOptionOutput
  extends Required<FurnitureOptionAttributes> {}

@Scopes(() => ({
  fullDetails: {
    include: [
      { model: ColorAttribute },
      { model: SizeAttribute },
      {
        model: Furniture,
        include: [{ model: Category }],
      },
    ],
  },
}))
@Table({
  modelName: "FurnitureOption",
  tableName: "furnitureOptions",
  timestamps: true,
  paranoid: true,
})
export class FurnitureOption extends Model<
  FurnitureOptionAttributes,
  FurnitureOptionCreationAttributes
> {
  @AllowNull(false)
  @Column
  sku?: string;

  @AllowNull(false)
  @Column
  price: number;

  @AllowNull(false)
  @Column
  quantity: number;

  @AllowNull(false)
  @Column
  image: string;

  @ForeignKey(() => Furniture)
  furnitureId: number;

  @BelongsTo(() => Furniture)
  furniture?: Furniture;

  @ForeignKey(() => ColorAttribute)
  colorAttributeId: number;

  @BelongsTo(() => ColorAttribute)
  colorAttribute?: ColorAttribute;

  @ForeignKey(() => SizeAttribute)
  sizeAttributeId: number;

  @BelongsTo(() => SizeAttribute)
  sizeAttribute?: SizeAttribute;

  @BeforeCreate
  static generateSkuBeforeCreate(instance: FurnitureOption) {
    instance.sku = generateSku(instance);
  }
}

export const generateSku = (
  furnitureOption: FurnitureOptionCreationAttributes
) => {
  const categoryCode = furnitureOption.furniture.category.code;
  const colorCode = furnitureOption.colorAttribute.code;
  const sizeCode = furnitureOption.sizeAttribute.code;

  return `${categoryCode}${colorCode}${sizeCode}`;
};
