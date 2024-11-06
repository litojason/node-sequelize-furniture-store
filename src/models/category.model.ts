import { InferAttributes, InferCreationAttributes } from "sequelize";
import { AllowNull, Column, HasMany, Model, Table } from "sequelize-typescript";

import { Furniture } from "./furniture.model";

export interface CategoryAttributes extends InferAttributes<Category> {}
export interface CategoryCreationAttributes
  extends InferCreationAttributes<Category> {}
export interface CategoryOutput extends Required<CategoryAttributes> {}

@Table({
  modelName: "Category",
  tableName: "categories",
  timestamps: true,
  paranoid: true,
})
export class Category extends Model<
  CategoryAttributes,
  CategoryCreationAttributes
> {
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  code: string;

  @AllowNull(false)
  @Column
  image: string;

  @HasMany(() => Furniture)
  furnitures?: Furniture[];
}
