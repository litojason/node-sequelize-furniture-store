import dotenv from "dotenv";
import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const { DB_USER, DB_PASS, DB_NAME, DB_HOST, DB_DIALECT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  dialect: (DB_DIALECT as Dialect) || "mysql",
  host: DB_HOST,
  storage: ":memory:",
  models: [__dirname + "/models/**/*.model.ts"],
  modelMatch: (filename, member) => {
    return (
      filename.substring(0, filename.indexOf(".model")).toLowerCase() ===
      member.toLowerCase()
    );
  },
});

export { Sequelize, sequelize };
