import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // All validation errors go through next()
    if (!username || !email || !password) {
      return next(new AppError("All fields are required", 400));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(new AppError("Invalid email format", 400));
    }

    if (password.length < 8) {
      return next(new AppError("Password must be at least 8 characters", 400));
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return next(new AppError("Email or username already in use", 409));
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    next(err); // unexpected crash → goes to errorHandler
  }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  // Validate fields
  if (!username || !password) {
    return next(new AppError("All fields are required", 400));
  }

  try {
    // Check if user exists
    const validUser = await User.findOne({ username });
    if (!validUser) {
      return next(new AppError("Invalid credentials", 401)); // not 404
    }

    // Check password
    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      return next(new AppError("Invalid credentials", 401));
    }

    // Sign token WITH expiry
    const token = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Strip password
    const { password: pass, ...rest } = validUser.toObject();

    // Set cookie with security flags
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json(rest);

  } catch (error) {
    next(error);
  }
};
