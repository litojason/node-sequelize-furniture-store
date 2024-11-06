import { FurnitureCreationAttributes } from "../../models/furniture.model";

export const FURNITURES: FurnitureCreationAttributes[] = [
  {
    name: "Malm",
    description: "Bed frame, high, white/Luröy, 150x200 cm",
    image: "www",
    categoryId: 1,
    discountId: 1,
  },
  {
    name: "Slattum",
    description: "Upholstered bed frame, Vissle dark grey, 150x200 cm",
    image: "www",
    categoryId: 1,
    discountId: 1,
  },
].map((furniture) => ({
  ...furniture,
  createdAt: new Date(),
  updatedAt: new Date(),
}));
