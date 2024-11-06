import { QueryInterface } from "sequelize";

import { REVIEWS } from "./constants/review.constant";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert("reviews", REVIEWS, {});
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("reviews", null, {});
  },
};
