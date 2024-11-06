import { DiscountCreationAttributes } from "../../models/discount.model";

export const DISCOUNTS: DiscountCreationAttributes[] = [
  {
    name: "10% off for any bed.",
    description: "Purchase any bed with 10% off.",
    percentage: 10,
    isActive: true,
  },
].map((discount) => ({
  ...discount,
  createdAt: new Date(),
  updatedAt: new Date(),
}));
