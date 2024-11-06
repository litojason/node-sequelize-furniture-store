import { QueryInterface } from "sequelize";

import { ORDER_STATUSES } from "./constants/orderStatus.constant";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert("orderStatuses", ORDER_STATUSES, {});
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("orderStatuses", null, {});
  },
};
