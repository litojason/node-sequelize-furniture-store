import { QueryInterface } from "sequelize";

import { PAYMENT_METHODS } from "./constants/paymentMethod.constant";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert("paymentMethods", PAYMENT_METHODS, {});
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("paymentMethods", null, {});
  },
};
