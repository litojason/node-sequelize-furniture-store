import { QueryInterface } from "sequelize";

import { CATEGORIES } from "./constants/category.constant";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert("categories", CATEGORIES, {});
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("categories", null, {});
  },
};
