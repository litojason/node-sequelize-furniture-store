import { PopularSearchCreationAttributes } from "../../models/popularSearch.model";

export const POPULAR_SEARCHES: PopularSearchCreationAttributes[] = [
  //   { name: "Kura" },
  //   { name: "Lauters" },
  { name: "Malm" },
  { name: "Slattum" },
  //   { name: "Bookselves" },
  //   { name: "Baggebo" },
].map((review) => ({
  ...review,
  createdAt: new Date(),
  updatedAt: new Date(),
}));
