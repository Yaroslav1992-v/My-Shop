import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/user.model.js";
import { Request, Response, NextFunction, RequestHandler } from "express";
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized,token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};
export { protect, admin };
