import { QueryInterface } from "sequelize";

import { COLOR_ATTRIBUTES } from "./constants/colorAttribute.contant";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert("colorAttributes", COLOR_ATTRIBUTES, {});
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("colorAttributes", null, {});
  },
};
