import Project from "../models/Project.js";
import express from "express";

const router = express.Router();

// Route to submit a new project
router.post("/submitProject", async (req, res) => {
  try {
    const projectData = req.body;
    const newProject = new Project({
      ...projectData,
      authorId: req.body.authorId,
    }); // Ensure authorId is included
    await newProject.save();
    res.status(201).send(newProject);
  } catch (error) {
    console.error("Error submitting project:", error);
    res.status(500).send("Server error while submitting project");
  }
});

// Route to get all projects with author details
router.get("/getProjects", async (req, res) => {
  const { page = 1, limit = 9 } = req.query; // Default to page 1 and limit 9
  const skip = (page - 1) * limit;

  try {
    const projects = await Project.find()
      .populate(
        "authorId",
        "username email profileImage headline bio createdAt"
      )
      .sort({ createdAt: -1 })
      .skip(skip) // Skip the first 'skip' projects
      .limit(Number(limit)); // Limit the number of projects returned

    const totalProjects = await Project.countDocuments(); // Get total number of projects

    // Use res.json() instead of res.send()
    res.status(200).json({
      projects,
      totalPages: Math.ceil(totalProjects / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Server error while fetching projects" });
  }
});

// Route to get a project by ID
router.get("/getProject/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId).populate(
      "authorId", // Populating author details
      "username email profileImage headline bio"
    );

    if (!project) {
      return res.status(404).send("Project not found");
    }

    res.status(200).send(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).send("Server error while fetching project");
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

// Route to get projects related to the logged-in user
router.post("/getUserProjects", async (req, res) => {
  try {
    const { userId } = req.body;
    // Find the projects that the user has created (filter by the authorId field)
    const userProjects = await Project.find({ authorId: userId }).populate(
      "authorId", // Populate authorId to get user details
      "username email profileImage headline bio"
    );
    res.status(200).send(userProjects);
  } catch (error) {
    console.error("Error fetching user projects:", error);
    res.status(500).send("Server error while fetching user projects");
  }
});

router.post("/getAuthorProjects", async (req, res) => {
  try {
    const { authorId } = req.body;
    // Find the projects that the user has created (filter by the authorId field)
    const authorProjects = await Project.find({ authorId: authorId }).populate(
      "authorId", // Populate authorId to get user details
      "username email profileImage headline bio"
    );
    res.status(200).send(authorProjects);
  } catch (error) {
    console.error("Error fetching user projects:", error);
    res.status(500).send("Server error while fetching user projects");
  }
});

// Route to delete a project by ID (also included as a separate route)
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
