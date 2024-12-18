import mongoose from "mongoose"; // Ensure this is correct
import Project from "../models/Project.js";
import User from "../models/User.js";
import express from "express";

const router = express.Router();

// Update project details
router.patch("/editProject/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    const updatedDetails = req.body; // Get the updated details from the request body

    // Find the project by ID and update it with the new details
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      updatedDetails,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Send back the updated project data
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/submitProject", async (req, res) => {
  try {
    const projectData = req.body;

    // Convert authorId to ObjectId correctly
    const authorId = new mongoose.Types.ObjectId(req.body.authorId);

    const newProject = new Project({
      ...projectData,
      authorId: authorId, // Correctly passing the ObjectId
    });
    await newProject.save();

    // Fetch the user
    const user = await User.findById(authorId);
    if (user) {
      // console.log("user: ", user);
    }

    // Ensure milestonesAchieved is initialized as an empty array if it's undefined
    user.milestonesAchieved = user.milestonesAchieved || [];

    // Check if a new milestone is reached
    let recentMilestone = null;

    // Count the projects that the author has created
    const projectCount = await Project.countDocuments({
      authorId: authorId, // Use ObjectId here
    });

    // console.log("projectCount: ", projectCount);

    // Milestone checks
    if (
      projectCount === 1 &&
      !user.milestonesAchieved.includes("First Project Shared")
    ) {
      console.log("First project shared");
      user.milestonesAchieved.push("First Project Shared");
      recentMilestone = "First Project Shared";
    }

    if (
      projectCount === 10 &&
      !user.milestonesAchieved.includes("10 Projects Shared")
    ) {
      user.milestonesAchieved.push("10 Projects Shared");
      recentMilestone = "10 Projects Shared"; // Update recent milestone
    }

    // Save the updated user with new milestone (if any)
    await user.save();

    // Respond with the new project and recent milestone (if any)
    res.status(201).send({ newProject, recentMilestone });
  } catch (error) {
    console.error("Error submitting project:", error);
    res.status(500).send("Server error while submitting project");
  }
});

// Route to get all projects with author details
router.get("/getProjects", async (req, res) => {
  const { page = 1, limit = 24, filter = "most recent" } = req.query;
  const skip = (page - 1) * limit;
  // console.log("filter: ", filter);

  try {
    // Set sorting criteria based on filter
    let sortCriteria;
    switch (filter) {
      case "most liked":
        // console.log("most liked");
        sortCriteria = { likeCount: -1 }; // Sort by likeCount descending
        break;
      case "most recent":
        // console.log("most recent");
        sortCriteria = { createdAt: -1 };
        break;
      case "most viewed":
        // console.log("most viewed");
        sortCriteria = { projectViews: -1 };
        break;
      default:
        sortCriteria = { createdAt: -1 }; // Default sorting
    }

    // Fetch projects with sorting, pagination, and populate author details
    const projects = await Project.find()
      .populate("authorId", "username email profileImage headline bio college") // Populate author details
      .sort(sortCriteria) // Sort by the selected criteria
      .skip(skip) // Apply pagination
      .limit(Number(limit)); // Limit the number of results

    const totalProjects = await Project.countDocuments(); // Count total documents for pagination

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
      project.likeCount++; // Increment likeCount
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
    project.likeCount--;
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
