import { InferAttributes, InferCreationAttributes } from "sequelize";
import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

import { User } from "./user.model";
import { Furniture } from "./furniture.model";

export interface ReviewAttributes extends InferAttributes<Review> {}
export interface ReviewCreationAttributes
  extends InferCreationAttributes<Review> {}
export interface ReviewOutput extends Required<ReviewAttributes> {}

@Table({
  modelName: "Review",
  tableName: "reviews",
  timestamps: true,
  paranoid: true,
  //   indexes: [{ unique: true, fields: ["userId", "furnitureId"] }],
})
export class Review extends Model<ReviewAttributes, ReviewCreationAttributes> {
  @AllowNull(false)
  @Column
  rating: number;

  @AllowNull(false)
  @Column
  comment: string;

  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user?: User;

  @ForeignKey(() => Furniture)
  furnitureId: number;

  @BelongsTo(() => Furniture)
  furniture?: Furniture;
}
