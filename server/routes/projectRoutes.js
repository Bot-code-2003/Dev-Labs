import Project from "../models/Project.js";
import express from "express";

const router = express.Router();

// Route to submit a new project
router.post("/submitProject", async (req, res) => {
  const projectData = req.body;
  const newProject = new Project(projectData);
  await newProject.save();
  res.status(201).send(newProject);
});

// Route to get all projects
router.get("/getProjects", async (req, res) => {
  const projects = await Project.find();
  res.status(200).send(projects);
});

// Route to delete a project by ID
router.delete("/deleteProject", async (req, res) => {
  const projectId = req.body.projectId;
  await Project.findByIdAndDelete(projectId);
  res.status(200).send("Project deleted");
});

router.patch("/likeProject", async (req, res) => {
  try {
    const { projectId, userId } = req.body;
    const project = await Project.findById(projectId);

    if (!project.projectLikes.includes(userId)) {
      project.projectLikes.push(userId); // Only add if not already liked
    }

    await project.save();
    res.status(200).send("Project liked");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.post("/unlikeProject", async (req, res) => {
  const { projectId, userId } = req.body;
  const project = await Project.findById(projectId);
  project.projectLikes = project.projectLikes.filter((id) => id !== userId);
  await project.save();
  res.status(200).send("Project unliked");
});

router.patch("/incProjectView", async (req, res) => {
  const { projectId } = req.body;
  const project = await Project.findById(projectId);
  project.projectViews++;
  await project.save();
  res.status(200).send("Project viewed");
});

export default router;
