import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const newUser = new User({ firstname, lastname, email, password });
  if (await User.findOne({ email: email })) {
    res.status(400).send("User already exists");
  } else {
    await newUser.save();
    const token = jwt.sign({ email }, "secretkey");
    res.status(200).send({ token });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(400).send("User does not exist");
  } else {
    if (user.password === password) {
      const token = jwt.sign({ email }, "secretkey");
      res.status(200).send({ token });
    } else {
      res.status(400).send("Invalid password");
    }
  }
});

export default router;
