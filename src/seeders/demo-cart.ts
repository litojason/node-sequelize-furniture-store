import { QueryInterface } from "sequelize";

import { CARTS } from "./constants/cart.constant";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert("carts", CARTS, {});
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("carts", null, {});
  },
};
