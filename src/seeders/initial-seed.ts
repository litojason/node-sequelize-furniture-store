import { QueryInterface } from "sequelize";

import { COLOR_ATTRIBUTES } from "./constants/colorAttribute.contant";
import { SIZE_ATTRIBUTES } from "./constants/sizeAttribute.constant";
import { CATEGORIES } from "./constants/category.constant";
import { DISCOUNTS } from "./constants/discount.constant";
import { PAYMENT_METHODS } from "./constants/paymentMethod.constant";
import { POPULAR_SEARCHES } from "./constants/popularSearch.constant";
import { ORDER_STATUSES } from "./constants/orderStatus.constant";

import { FURNITURES } from "./constants/furniture.constant";
import { FURNITURE_OPTIONS } from "./constants/furnitureOption.constant";

import { USERS } from "./constants/user.constant";
import { CARTS } from "./constants/cart.constant";
import { USER_PAYMENT_METHODS } from "./constants/userPaymentMethod.constant";
import { ADDRESSES } from "./constants/address.constant";
import { FAVORITES } from "./constants/favorite.constant";
import { REVIEWS } from "./constants/review.constant";

const DATA: { tableName: string; dataArray: any[] }[] = [
  { tableName: "colorAttributes", dataArray: COLOR_ATTRIBUTES },
  { tableName: "sizeAttributes", dataArray: SIZE_ATTRIBUTES },
  { tableName: "categories", dataArray: CATEGORIES },
  { tableName: "discounts", dataArray: DISCOUNTS },
  { tableName: "paymentMethods", dataArray: PAYMENT_METHODS },
  { tableName: "popularSearches", dataArray: POPULAR_SEARCHES },
  { tableName: "orderStatuses", dataArray: ORDER_STATUSES },

  { tableName: "users", dataArray: USERS },

  { tableName: "furnitures", dataArray: FURNITURES },
  { tableName: "furnitureOptions", dataArray: FURNITURE_OPTIONS },

  { tableName: "carts", dataArray: CARTS },
  { tableName: "userPaymentMethods", dataArray: USER_PAYMENT_METHODS },
  { tableName: "addresses", dataArray: ADDRESSES },
  { tableName: "favorites", dataArray: FAVORITES },
  { tableName: "reviews", dataArray: REVIEWS },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await Promise.all(
        DATA.map(async (data) => {
          return await queryInterface.bulkInsert(
            data.tableName,
            data.dataArray,
            { transaction }
          );
        })
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface: QueryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await Promise.all(
        DATA.map(async (data) => {
          return await queryInterface.bulkDelete(data.tableName, null, {
            transaction,
          });
        })
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
