import { Response } from "express";
import jwt from "jsonwebtoken";
const generateToken = (res: Response, userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || "SECRET", {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "Development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 1000,
  });
};
export default generateToken;
