import {
  FurnitureOptionCreationAttributes,
  generateSku,
} from "../../models/furnitureOption.model";
import { COLOR_ATTRIBUTES } from "./colorAttribute.contant";
import { SIZE_ATTRIBUTES } from "./sizeAttribute.constant";

const colorAttribute = COLOR_ATTRIBUTES[0];
const sizeAttribute = SIZE_ATTRIBUTES[0];

export const FURNITURE_OPTIONS: FurnitureOptionCreationAttributes[] = [
  {
    sku: "B1W1150x200",
    price: 309,
    quantity: 100,
    image: "www",
    furnitureId: 1,
    colorAttributeId: 1,
    // colorAttribute,
    sizeAttributeId: 1,
    // sizeAttribute,
  },
  {
    sku: "B1W1180x200",
    price: 309,
    quantity: 99,
    image: "www",
    furnitureId: 1,
    colorAttributeId: 1,
    // colorAttribute,
    sizeAttributeId: 2,
    // sizeAttribute,
  },
  {
    sku: "B1W1150x200",
    price: 169,
    quantity: 98,
    image: "www",
    furnitureId: 2,
    colorAttributeId: 2,
    // colorAttribute,
    sizeAttributeId: 1,
    // sizeAttribute,
  },
  {
    sku: "B1W1150x200",
    price: 169,
    quantity: 97,
    image: "www",
    furnitureId: 2,
    colorAttributeId: 3,
    // colorAttribute,
    sizeAttributeId: 1,
    // sizeAttribute,
  },
].map((furnitureOption) => ({
  ...furnitureOption,
  //   sku: generateSku(furnitureOption),
  //   colorAttribute: undefined,
  //   sizeAttribute: undefined,
  createdAt: new Date(),
  updatedAt: new Date(),
}));
