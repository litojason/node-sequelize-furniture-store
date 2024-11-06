import { CartCreationAttributes } from "../../models/cart.model";

export const CARTS: CartCreationAttributes[] = [
  { userId: 1 },
  { userId: 2 },
].map((cart) => ({
  ...cart,
  createdAt: new Date(),
  updatedAt: new Date(),
}));
