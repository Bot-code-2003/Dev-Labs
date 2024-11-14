import axios from "axios";

const API = axios.create({ baseURL: "https://dev-labs-server.vercel.app" });
//
// const API = axios.create({ baseURL: "http://localhost:5000" });

/**
 * Route to share the project
 *
 * @param projectData
 * @returns - projectData and Milestone
 */
export const submitProject = (projectData) => async (dispatch) => {
  try {
    const { data } = await API.post("/project/submitProject", projectData);
    console.log("Recieved data from server: ", data);
    dispatch({ type: "SUBMIT_PROJECT", payload: data });

    // Check if a new milestone is reached and update it in the global state.
    if (data.recentMilestone) {
      console.log("New milestone reached: ", data.recentMilestone);
      dispatch({ type: "SUBMIT_MILESTONE", payload: data.recentMilestone });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProjects =
  (page = 1, limit = 24, filter = "most recent") =>
  async (dispatch) => {
    try {
      // console.log("Get projects action called", filter);
      const { data } = await API.get(
        `/project/getProjects?page=${page}&limit=${limit}&filter=${filter}`
      );

      // console.log("Received projects from server: ", data);

      dispatch({ type: "GET_PROJECTS", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const getProject = (projectId) => async (dispatch) => {
  try {
    const { data } = await API.get(`/project/getProject/${projectId}`);
    dispatch({ type: "CLICKED_PROJECT", payload: data }); // Dispatch the clicked project data
  } catch (error) {
    console.log("Error fetching project by ID: ", error);
  }
};

export const likeProject = (projectId, userId) => async (dispatch) => {
  try {
    // console.log("likeProject action called");
    dispatch({ type: "LIKE_PROJECT", payload: { projectId, userId } });
    await API.patch("/project/likeProject", { projectId, userId }); // PATCH request
  } catch (error) {
    console.log(error);
  }
};

export const editProject =
  (updatedProjectDetails, projectId) => async (dispatch) => {
    try {
      console.log("editProject action called", updatedProjectDetails);

      // Send the update request to the backend
      const { data } = await API.patch(
        `/project/editProject/${projectId}`,
        updatedProjectDetails
      );

      // Dispatching the action to update the store with the updated project details
      dispatch({ type: "EDIT_PROJECT", payload: data });
    } catch (error) {
      console.error("Edit project error:", error);
    }
  };

export const unlikeProject = (projectId, userId) => async (dispatch) => {
  try {
    // console.log("unlikeProject action called");
    dispatch({ type: "UNLIKE_PROJECT", payload: { projectId, userId } });
    await API.post("/project/unlikeProject", { projectId, userId });
  } catch (error) {
    console.log(error);
  }
};

export const incProjectView = (projectId) => async (dispatch) => {
  try {
    // console.log("incProjectView action called");
    dispatch({ type: "INC_PROJECT_VIEW", payload: projectId });
    await API.patch("/project/incProjectView", { projectId });
  } catch (error) {
    console.log(error);
  }
};

export const clickedProjectAction = (clickedProject) => async (dispatch) => {
  try {
    dispatch({ type: "CLICKED_PROJECT", payload: clickedProject });
  } catch (error) {
    console.log(error);
  }
};

// Action to get projects related to the logged-in user
export const getUserProjects = (userId) => async (dispatch) => {
  try {
    // console.log("getUserProjects action called");
    const { data } = await API.post("/project/getUserProjects", { userId });
    // console.log("Received user projects from server: ", data);
    dispatch({ type: "GET_USER_PROJECTS", payload: data });
  } catch (error) {
    console.error("Error fetching user projects:", error);
  }
};

export const getAuthorProjects = (authorId) => async (dispatch) => {
  try {
    // console.log("getAuthorProjects action called", authorId);
    const { data } = await API.post("/project/getAuthorProjects", { authorId });
    // console.log("Received author projects from server: ", data);
    dispatch({ type: "GET_AUTHOR_PROJECTS", payload: data });
  } catch (error) {
    console.error("Error fetching author projects:", error);
  }
};

export const deleteProject = (projectId) => async (dispatch) => {
  try {
    // console.log("deleteProject action called: ", projectId);
    await API.delete(`/project/deleteProject/${projectId}`);
    dispatch({ type: "DELETE_PROJECT", payload: projectId });
  } catch (error) {
    console.log(error);
  }
};
