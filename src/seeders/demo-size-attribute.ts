import { QueryInterface } from "sequelize";

import { SIZE_ATTRIBUTES } from "./constants/sizeAttribute.constant";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert("sizeAttributes", SIZE_ATTRIBUTES, {});
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("sizeAttributes", null, {});
  },
};
