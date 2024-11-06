import { ColorAttributeCreationAttributes } from "../../models/colorAttribute.model";

export const COLOR_ATTRIBUTES: ColorAttributeCreationAttributes[] = [
  { name: "White", value: "white", code: "W1" },
  { name: "Blue", value: "blue", code: "B1" },
  { name: "Black", value: "black", code: "B2" },
].map((color) => ({
  ...color,
  createdAt: new Date(),
  updatedAt: new Date(),
}));
