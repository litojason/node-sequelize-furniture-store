import { FavoriteCreationAttributes } from "../../models/favorite.model";

export const FAVORITES: FavoriteCreationAttributes[] = [
  {
    userId: 1,
    furnitureId: 1,
  },
].map((favorite) => ({
  ...favorite,
  createdAt: new Date(),
  updatedAt: new Date(),
}));
