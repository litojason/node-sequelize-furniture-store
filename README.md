# Node Sequelize Furniture Store

Furniture Store API built with [Typescript](https://www.typescriptlang.org/), [Node JS](https://nodejs.org/en), [Express](https://expressjs.com/), [MySQL](https://www.mysql.com/), [Sequelize](https://sequelize.org/), [Sequelize-Typescript](https://www.npmjs.com/package/sequelize-typescript).

## Database Design

<img src="/src/assets/furniture-store-db-diagram.png">

## Example Project With This API

- React Native Furniture Store: [RNFurnitureStore](https://github.com/litojason/RNFurnitureStore)

## Additional Dependencies

Please refer to `package.json`.

- [bcryptjs](https://www.npmjs.com/package/bcryptjs): hash password
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): generate token
- [yup](https://www.npmjs.com/package/yup): validation
- [cors](https://www.npmjs.com/package/cors): enable CORS

## Installation

    git clone https://github.com/litojason/node-sequelize-furniture-store.git

    cd node-sequelize-furniture-store

    npm install

## Setup Env

Create 3 (or more) new files: `.env.development`, `.env.staging`, `.env.production`. Please copy example below or refer to `.env.sample` file.

    DB_HOST=127.0.0.1
    DB_NAME=db_name
    DB_USER=db_user
    DB_PASS=db_password
    DB_PORT=3306
    DB_DIALECT=mysql
    HOST=localhost
    PORT=3000
    NODE_ENV=development
    JWT_SECRET_KEY=secret_key

## Run Seeders

```bash
# Run initial seed (dummy data to database) (DEV)
npm run run:seed:dev initial-seed.ts

# Run any demo seed
npm run run:seed:dev <file-name-inside-seeders-folder>
# Exampe: npm run run:seed:dev demo-user.ts
```

## Run

```bash
# Development environment
npm run dev

# Staging environment
npm run staging

# Production environment
npm run prod
```

## Feature Done (But May Need Improvement)

- Login, Register, Edit Profile, Change Password.
- Show Category, Furniture, Furniture Option, Search Furniture.
- Add To Cart, Delete Cart Item.
- Add User Address, User Payment Method.
- Get User Orders, Order Details.

## Todo

- Change App Theme.
- Update Cart Item quantity.
- Add validation for every APIs (with yup or other possible validations).
- Add Update Order Status API (Pending, Shipped, Completed, Cancelled). PS: Current flow directly make Order Completed instead of Pending.
- Add Update User Favorite API.
- Add Add Furniture Review (after Order completed).
- Add Discount API.
