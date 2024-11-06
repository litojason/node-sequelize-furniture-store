import { QueryInterface } from "sequelize";

import { USER_PAYMENT_METHODS } from "./constants/userPaymentMethod.constant";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert(
      "userPaymentMethods",
      USER_PAYMENT_METHODS,
      {}
    );
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("userPaymentMethods", null, {});
  },
};
