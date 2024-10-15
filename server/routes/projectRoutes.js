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

// New Route to like a project and increment the likes
router.post("/likeProject", async (req, res) => {
  const { projectId } = req.body;
  try {
    // Find project by ID and increment the projectLikes by 1
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $inc: { projectLikes: 1 } }, // Increment likes by 1
      { new: true } // Return the updated project document
    );

    if (!updatedProject) {
      return res.status(404).send("Project not found");
    }

    res.status(200).send(updatedProject);
  } catch (error) {
    res.status(500).send("An error occurred while liking the project");
  }
});

export default router;
