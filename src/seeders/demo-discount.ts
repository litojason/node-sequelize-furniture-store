import { QueryInterface } from "sequelize";

import { DISCOUNTS } from "./constants/discount.constant";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert("discounts", DISCOUNTS, {});
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("discounts", null, {});
  },
};
