import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { sequelize } from "./sequelize";
import { errorHandler } from "./middlewares/errors";
import userRouter from "./routes/user.router";
import addressRouter from "./routes/address.router";
import paymentMethodRouter from "./routes/paymentMethod.router";
import favoriteRouter from "./routes/favorite.router";

import categoryRouter from "./routes/category.router";
import attributeRouter from "./routes/attribute.router";
import furnitureOptionRouter from "./routes/furnitureOption.router";
import furnitureRouter from "./routes/furniture.router";

import cartRouter from "./routes/cart.router";
import orderRouter from "./routes/order.router";

import reviewRouter from "./routes/review.router";

import constantRouter from "./routes/constant.router";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const app = express();
const { PORT } = process.env;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/payment-methods", paymentMethodRouter);
app.use("/api/v1/addresses", addressRouter);
app.use("/api/v1/favorites", favoriteRouter);

app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/attributes", attributeRouter);
app.use("/api/v1/furniture-options", furnitureOptionRouter);
app.use("/api/v1/furnitures", furnitureRouter);

app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/orders", orderRouter);

app.use("/api/v1/reviews", reviewRouter);

app.use("/api/v1/constants", constantRouter);

app.use(errorHandler);

sequelize
  .sync({
    // force: true,
    // alter: true,
  })
  .then(() => {
    console.log("Connection has been established successfully.");

    app.listen(PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
