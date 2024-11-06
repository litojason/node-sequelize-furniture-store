import { QueryInterface } from "sequelize";

import { ADDRESSES } from "./constants/address.constant";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert("addresses", ADDRESSES, {});
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("addresses", null, {});
  },
};
