import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

export const generateToken = ({ id, email }: User) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "24h",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY!);
};
