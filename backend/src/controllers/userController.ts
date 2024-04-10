import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";
const authUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.json(user);
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  }
);
const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error("User already exists");
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      generateToken(res, user._id);
      res.status(201).json(user);
    }
  }
);
const logout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
  }
);
const getUserProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user._id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }
);
const updateUserProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password || user.password;
      }
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }
);
const getUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("getUsersProfile");
  }
);
const deleteUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("deleteUser");
  }
);
const getUserById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("getUserById");
  }
);
const updateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("updateUser");
  }
);
export {
  register,
  deleteUser,
  authUser,
  getUsers,
  logout,
  updateUserProfile,
  getUserProfile,
  getUserById,
  updateUser,
};
