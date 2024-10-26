import axios from "axios";

const API = axios.create({ baseURL: "https://dev-labs-server.vercel.app" });

// const API = axios.create({ baseURL: "http://localhost:5000" });

export const submitProject = (projectData) => async (dispatch) => {
  try {
    const { data } = await API.post("/project/submitProject", projectData);
    console.log("Recieved data from server: ", data);
    dispatch({ type: "SUBMIT_PROJECT", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getProjects =
  (page = 1, limit = 9) =>
  async (dispatch) => {
    try {
      console.log("getProjects action called");

      const { data } = await API.get(
        `/project/getProjects?page=${page}&limit=${limit}`
      );
      console.log();

      console.log("Received projects from server: ", data);

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
    console.log("likeProject action called");
    dispatch({ type: "LIKE_PROJECT", payload: { projectId, userId } });
    await API.patch("/project/likeProject", { projectId, userId }); // PATCH request
  } catch (error) {
    console.log(error);
  }
};

export const unlikeProject = (projectId, userId) => async (dispatch) => {
  try {
    console.log("unlikeProject action called");
    dispatch({ type: "UNLIKE_PROJECT", payload: { projectId, userId } });
    await API.post("/project/unlikeProject", { projectId, userId });
  } catch (error) {
    console.log(error);
  }
};

export const incProjectView = (projectId) => async (dispatch) => {
  try {
    console.log("incProjectView action called");
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
    console.log("getUserProjects action called");
    const { data } = await API.post("/project/getUserProjects", { userId });
    console.log("Received user projects from server: ", data);
    dispatch({ type: "GET_USER_PROJECTS", payload: data });
  } catch (error) {
    console.error("Error fetching user projects:", error);
  }
};

export const getAuthorProjects = (authorId) => async (dispatch) => {
  try {
    console.log("getAuthorProjects action called");
    const { data } = await API.post("/project/getUserProjects", { authorId });
    console.log("Received author projects from server: ", data);
    dispatch({ type: "GET_AUTHOR_PROJECTS", payload: data });
  } catch (error) {
    console.error("Error fetching author projects:", error);
  }
};

export const deleteProject = (projectId) => async (dispatch) => {
  try {
    console.log("deleteProject action called: ", projectId);
    await API.delete(`/project/deleteProject/${projectId}`);
    dispatch({ type: "DELETE_PROJECT", payload: projectId });
  } catch (error) {
    console.log(error);
  }
};
