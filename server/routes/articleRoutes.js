import express from "express";
import mongoose from "mongoose";
import Article from "../models/Article.js";

const router = express.Router();

router.get("/getArticles", async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).send(articles);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getArticlesByCategory/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const articles = await Article.find({ articleCategory: category });
    res.status(200).send({ articles, category });
  } catch (error) {
    console.log(error);
  }
});

router.get("/getFeaturedArticles", async (req, res) => {
  try {
    const articles = await Article.find({ featured: true });
    res.status(200).send(articles);
  } catch (error) {
    console.log(error);
  }
});

router.post("/submit", async (req, res) => {
  const article = req.body;
  try {
    const newArticle = new Article({ ...article });
    await newArticle.save();
    res.status(201).send("Article submitted");
  } catch (error) {
    console.log(error);
  }
});

export default router;
