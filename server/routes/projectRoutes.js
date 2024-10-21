import Project from "../models/Project.js";
import express from "express";

const router = express.Router();

// Route to submit a new project
router.post("/submitProject", async (req, res) => {
  try {
    const projectData = req.body;
    const newProject = new Project(projectData);
    await newProject.save();
    res.status(201).send(newProject);
  } catch (error) {
    console.error("Error submitting project:", error);
    res.status(500).send("Server error while submitting project");
  }
});

// Route to get all projects with author details
router.get("/getProjects", async (req, res) => {
  try {
    // Use populate to get author details from User model
    const projects = await Project.find().populate(
      "author",
      "firstname lastname authorImage email"
    );

    res.status(200).send(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).send("Server error while fetching projects");
  }
});

// Route to delete a project by ID
router.delete("/deleteProject", async (req, res) => {
  try {
    const projectId = req.body.projectId;
    await Project.findByIdAndDelete(projectId);
    res.status(200).send("Project deleted");
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).send("Server error while deleting project");
  }
});

// Route to like a project
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
    console.error("Error liking project:", error);
    res.status(500).send("Server error while liking project");
  }
});

// Route to unlike a project
router.post("/unlikeProject", async (req, res) => {
  try {
    const { projectId, userId } = req.body;
    const project = await Project.findById(projectId);

    project.projectLikes = project.projectLikes.filter((id) => id !== userId);
    await project.save();

    res.status(200).send("Project unliked");
  } catch (error) {
    console.error("Error unliking project:", error);
    res.status(500).send("Server error while unliking project");
  }
});

// Route to increment project view count
router.patch("/incProjectView", async (req, res) => {
  try {
    const { projectId } = req.body;
    const project = await Project.findById(projectId);

    project.projectViews++;
    await project.save();

    res.status(200).send("Project viewed");
  } catch (error) {
    console.error("Error incrementing project view:", error);
    res.status(500).send("Server error while incrementing project view");
  }
});

// Route to handle author click (e.g., finding projects created by a specific user)
router.post("/authorClick", async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the projects that the user has created
    const projects = await Project.find({ authorId: userId });
    res.status(200).send(projects);
  } catch (error) {
    console.error("Error fetching author's projects:", error);
    res.status(500).send("Server error while fetching author's projects");
  }
});

// Route to get projects related to the logged-in user
router.post("/getUserProjects", async (req, res) => {
  try {
    const { userId } = req.body;
    // Find the projects that the user has created (filter by the author field)
    const userProjects = await Project.find({ author: userId }).populate(
      "author",
      "firstname lastname authorImage email"
    );
    res.status(200).send(userProjects);
  } catch (error) {
    console.error("Error fetching user projects:", error);
    res.status(500).send("Server error while fetching user projects");
  }
});

router.delete("/deleteProject/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;

    await Project.findByIdAndDelete(projectId);
    res.status(200).send("Project deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting project");
  }
});

export default router;
