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

export interface AddressAttributes extends InferAttributes<Address> {}
export interface AddressCreationAttributes
  extends InferCreationAttributes<Address> {}
export interface AddressOutput extends Required<AddressAttributes> {}

@Table({
  modelName: "Address",
  tableName: "addresses",
  timestamps: true,
})
export class Address extends Model<
  AddressAttributes,
  AddressCreationAttributes
> {
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  address: string;

  @AllowNull(false)
  @Column
  province: string;

  @AllowNull(false)
  @Column
  city: string;

  @AllowNull(false)
  @Column
  postalCode: string;

  @AllowNull(false)
  @Column
  phoneNumber: string;

  @ForeignKey(() => User)
  userId?: number;

  @BelongsTo(() => User)
  user?: User;
}
