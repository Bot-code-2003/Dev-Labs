import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const saltRounds = 10;

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, headline, bio, profileImage } = req.body;

    // Check if user already exists by email or username
    if ((await User.findOne({ email })) || (await User.findOne({ username }))) {
      return res
        .status(400)
        .send("User with this email or username already exists");
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      headline,
      bio,
      profileImage,
    });

    await newUser.save();

    // Create JWT token
    const token = jwt.sign(
      { email, userId: newUser._id, username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).send({
      token,
      username,
      userId: newUser._id,
      profileImage: newUser.profileImage,
      email: newUser.email,
      headline: newUser.headline,
      bio: newUser.bio,
      createdAt: newUser.createdAt,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).send("Server error during signup");
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User does not exist");
    }

    // Compare entered password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid password");
    }

    // Create JWT token
    const token = jwt.sign(
      { email, userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).send({
      token,
      username: user.username,
      userId: user._id,
      profileImage: user.profileImage,
      email: user.email,
      headline: user.headline,
      bio: user.bio,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Server error during login");
  }
});

// Edit Image Route
router.patch("/editImage", async (req, res) => {
  try {
    const { userId, changedImage } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    user.profileImage = changedImage;
    await user.save();
    res.status(200).send("Image edited");
  } catch (error) {
    console.error("Edit image error:", error);
    res.status(500).send("Server error during edit image");
  }
});

export default router;
