import { InferAttributes, InferCreationAttributes } from "sequelize";
import { BelongsTo, ForeignKey, Model, Table } from "sequelize-typescript";

import { Furniture } from "./furniture.model";
import { User } from "./user.model";

export interface FavoriteAttributes extends InferAttributes<Favorite> {}
export interface FavoriteCreationAttributes
  extends InferCreationAttributes<Favorite> {}
export interface FavoriteOutput extends Required<FavoriteAttributes> {}

@Table({
  modelName: "Favorite",
  tableName: "favorites",
  timestamps: true,
  // indexes: [{ unique: true, fields: ["userId", "furnitureId"] }],
})
export class Favorite extends Model<
  FavoriteAttributes,
  FavoriteCreationAttributes
> {
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user?: User;

  @ForeignKey(() => Furniture)
  furnitureId: number;

  @BelongsTo(() => Furniture)
  furniture?: Furniture;
}
