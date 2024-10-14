import Project from "../models/Project.js";
import express from "express";

const router = express.Router();

router.post("/submitProject", async (req, res) => {
  const projectData = req.body;
  const newProject = new Project(projectData);
  await newProject.save();
  res.status(201).send(newProject);
});

router.get("/getProjects", async (req, res) => {
  console.log("getProjects called (server)");

  const projects = await Project.find();
  res.status(200).send(projects);
});

router.delete("/deleteProject", async (req, res) => {
  const projectId = req.body.projectId;
  await Project.findByIdAndDelete(projectId);
  res.status(200).send("Project deleted");
});

export default router;
