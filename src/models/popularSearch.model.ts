import { InferAttributes, InferCreationAttributes } from "sequelize";
import { AllowNull, Column, Model, Table } from "sequelize-typescript";

export interface PopularSearchAttributes
  extends InferAttributes<PopularSearch> {}
export interface PopularSearchCreationAttributes
  extends InferCreationAttributes<PopularSearch> {}
export interface PopularSearchOutput
  extends Required<PopularSearchAttributes> {}

@Table({
  modelName: "PopularSearch",
  tableName: "popularSearches",
  timestamps: true,
  paranoid: true,
})
export class PopularSearch extends Model<
  PopularSearchAttributes,
  PopularSearchCreationAttributes
> {
  @AllowNull(false)
  @Column
  name: string;
}
