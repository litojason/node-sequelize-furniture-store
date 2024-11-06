import { QueryInterface } from "sequelize";

import { POPULAR_SEARCHES } from "./constants/popularSearch.constant";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert("popularSearches", POPULAR_SEARCHES, {});
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("popularSearches", null, {});
  },
};
