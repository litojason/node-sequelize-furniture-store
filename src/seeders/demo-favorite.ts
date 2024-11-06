import { QueryInterface } from "sequelize";

import { FAVORITES } from "./constants/favorite.constant";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert("favorites", FAVORITES, {});
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("favorites", null, {});
  },
};
