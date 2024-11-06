import { QueryInterface } from "sequelize";

import { FURNITURES } from "./constants/furniture.constant";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert("furnitures", FURNITURES, {});
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("furnitures", null, {});
  },
};
