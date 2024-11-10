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
    const {
      username,
      email,
      password,
      headline,
      bio,
      profileImage,
      identity,
      skills,
      currentPosition,
      college,
      nation,
    } = req.body;

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
      identity,
      skills,
      currentPosition,
      college,
      nation,
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
      identity: newUser.identity,
      skills: newUser.skills,
      currentPosition: newUser.currentPosition,
      college: newUser.college,
      nation: newUser.nation,
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
      identity: user.identity,
      skills: user.skills,
      currentPosition: user.currentPosition,
      college: user.college,
      nation: user.nation,
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

// Redux Action to Edit User Details
// Edit User Details Route
router.patch("/editDetails/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedDetails = req.body; // Contains fields like username, bio, headline, etc.

    // Find the user by ID and update fields
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updatedDetails },
      { new: true, runValidators: true } // Return updated document
    );

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Send the updated user details
    const {
      username,
      email,
      profileImage,
      headline,
      bio,
      identity,
      skills,
      currentPosition,
      college,
      nation,
      createdAt,
    } = user;

    // console.log("Updated user details:", user);

    res.status(200).send({
      username,
      email,
      profileImage,
      headline,
      bio,
      identity,
      skills,
      currentPosition,
      college,
      nation,
      createdAt,
    });
  } catch (error) {
    console.error("Edit user details error:", error);
    res.status(500).send("Server error during edit user details");
  }
});

// Get User Info Route
router.get("/getUserInfo/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const {
      username,
      email,
      profileImage,
      headline,
      bio,
      identity,
      skills,
      currentPosition,
      college,
      nation,
      createdAt,
    } = user;
    res.status(200).send({
      username,
      email,
      profileImage,
      headline,
      bio,
      identity,
      skills,
      currentPosition,
      college,
      nation,
      createdAt,
    });
  } catch (error) {
    console.error("Get user info error:", error);
    res.status(500).send("Server error during get user info");
  }
});

export default router;
