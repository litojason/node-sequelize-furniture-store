import { ReviewCreationAttributes } from "../../models/review.model";

export const REVIEWS: ReviewCreationAttributes[] = [
  {
    rating: 5,
    comment:
      "We bought this about a month ago. It was delivered on time and in good condition with no scratches.",
    userId: 1,
    furnitureId: 1,
  },
  {
    rating: 5,
    comment:
      "We purchased 2 of these beds and the quality far exceeds our expectations. The beds are well designed and worth the cost.",
    userId: 2,
    furnitureId: 1,
  },
].map((review) => ({
  ...review,
  createdAt: new Date(),
  updatedAt: new Date(),
}));
