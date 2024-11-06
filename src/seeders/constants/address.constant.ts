import { AddressCreationAttributes } from "../../models/address.model";

export const ADDRESSES: AddressCreationAttributes[] = [
  {
    name: "John Doe",
    address: "Some long street",
    province: "East Java",
    city: "Malang",
    phoneNumber: "081212341234",
    postalCode: "12345",
    userId: 1,
  },
  {
    name: "Jane Doe",
    address: "Some long street 2",
    province: "East Java 2",
    city: "Malang 2",
    phoneNumber: "081212341234",
    postalCode: "12345",
    userId: 1,
  },
].map((address) => ({
  ...address,
  createdAt: new Date(),
  updatedAt: new Date(),
}));
