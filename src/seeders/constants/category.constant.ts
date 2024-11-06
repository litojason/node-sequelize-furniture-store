import { CategoryCreationAttributes } from "../../models/category.model";

export const CATEGORIES: CategoryCreationAttributes[] = [
  { name: "Beds", code: "B1", image: "www" },
  { name: "Bookshelves", code: "B2", image: "www" },
  { name: "Chairs", code: "C1", image: "www" },
  { name: "Lamps", code: "L1", image: "www" },
  { name: "Rugs", code: "R1", image: "www" },
  { name: "Sofas", code: "S1", image: "www" },
  { name: "Tables", code: "T1", image: "www" },
  { name: "Wardrobes", code: "W1", image: "www" },
].map((category) => ({
  ...category,
  createdAt: new Date(),
  updatedAt: new Date(),
}));
