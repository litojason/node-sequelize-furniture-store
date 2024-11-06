import { hashPassword } from "../../lib/bcryptjs";
import { UserCreationAttributes } from "../../models/user.model";

export const USERS: UserCreationAttributes[] = [
  {
    email: "johndoe@gmail.com",
    name: "John Doe",
    phoneNumber: "081212341234",
    password: "123456",
  },
  {
    email: "janedoe@gmail.com",
    name: "Jane Doe",
    phoneNumber: "081212341235",
    password: "123456",
  },
].map((user) => ({
  ...user,
  password: hashPassword(user.password),
  createdAt: new Date(),
  updatedAt: new Date(),
}));
