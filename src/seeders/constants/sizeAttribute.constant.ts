import { SizeAttributeCreationAttributes } from "../../models/sizeAttribute.model";

export const SIZE_ATTRIBUTES: SizeAttributeCreationAttributes[] = [
  { name: "150x200 cm", value: "150x200cm", code: "150x200" },
  { name: "180x200 cm", value: "180x200cm", code: "180x200" },
  { name: "120x200 cm", value: "120x200cm", code: "120x200" },
  { name: "90x200 cm", value: "90x200cm", code: "90x200" },
].map((size) => ({
  ...size,
  createdAt: new Date(),
  updatedAt: new Date(),
}));
