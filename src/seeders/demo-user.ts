import { QueryInterface } from "sequelize";

import { USERS } from "./constants/user.constant";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert("users", USERS);
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
