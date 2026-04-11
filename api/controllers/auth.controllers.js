import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Input validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    // 3. Check for duplicates
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: "Email or username already in use" });
    }

    // 4. Hash password asynchronously
    const hashedPassword = await bcryptjs.hash(password, 12);

    // 5. Save new user — map to correct model field
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // 6. Return 201 Created — never return the full user object
    return res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error("Register error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
