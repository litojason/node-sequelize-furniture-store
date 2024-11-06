import { QueryInterface } from "sequelize";

import { FURNITURE_OPTIONS } from "./constants/furnitureOption.constant";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert("furnitureOptions", FURNITURE_OPTIONS, {});
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("furnitureOptions", null, {});
  },
};
