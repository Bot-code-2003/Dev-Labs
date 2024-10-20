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
    const { firstname, lastname, email, password, authorImage } = req.body;

    // Check if user already exists
    if (await User.findOne({ email })) {
      return res.status(400).send("User already exists");
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      authorImage,
    });

    await newUser.save();

    // Create JWT token
    const token = jwt.sign(
      { email, userId: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res
      .status(201)
      .send({ token, name: firstname, userId: newUser._id, authorImage });
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
      { email, userId: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).send({
      token,
      name: user.firstname,
      userId: user._id,
      authorImage: user.authorImage,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Server error during login");
  }
});

router.patch("/editImage", async (req, res) => {
  try {
    const { userId, changedImage } = req.body;
    const user = await User.findById(userId);
    user.authorImage = changedImage;
    await user.save();
    res.status(200).send("Image edited");
  } catch (error) {
    console.error("Edit image error:", error);
    res.status(500).send("Server error during edit image");
  }
});

export default router;
