import { InferAttributes, InferCreationAttributes } from "sequelize";
import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";

import { Category } from "./category.model";
import { Discount } from "./discount.model";
import { User } from "./user.model";
import { Favorite } from "./favorite.model";
import { FurnitureOption } from "./furnitureOption.model";
import { Review } from "./review.model";

export interface FurnitureAttributes extends InferAttributes<Furniture> {}
export interface FurnitureCreationAttributes
  extends InferCreationAttributes<Furniture> {}
export interface FurnitureOutput extends Required<FurnitureAttributes> {}

@Table({
  modelName: "Furniture",
  tableName: "furnitures",
  timestamps: true,
  paranoid: true,
})
export class Furniture extends Model<
  FurnitureAttributes,
  FurnitureCreationAttributes
> {
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  description: string;

  @AllowNull(false)
  @Column
  image: string;

  @ForeignKey(() => Category)
  categoryId: number;

  @BelongsTo(() => Category)
  category?: Category;

  @ForeignKey(() => Discount)
  discountId?: number;

  @BelongsTo(() => Discount)
  discount?: Discount;

  @HasMany(() => FurnitureOption)
  furnitureOptions?: FurnitureOption[];

  @HasMany(() => Review)
  reviews?: Review[];

  @HasMany(() => Favorite)
  favorites?: Favorite;

  // @Column
  // get isFavorite(): boolean {
  //   return this.getDataValue('users').includes
  // }
}
