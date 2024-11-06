import { Dialect } from "sequelize";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOST: string;
      PORT: string;
      NODE_ENV: "development" | "staging" | "production";
      JWT_SECRET_KEY: string;
      DB_USER: string;
      DB_PASS: string;
      DB_NAME: string;
      DB_HOST: string;
      DB_DIALECT: Dialect;
    }
  }
}
