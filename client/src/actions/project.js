import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const submitProject = (projectData, navigate) => async (dispatch) => {
  try {
    const { data } = await API.post("/project/submitProject", projectData);
    console.log("Recieved data from server: ", data);
    dispatch({ type: "SUBMIT_PROJECT", payload: data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const getProjects = () => async (dispatch) => {
  try {
    console.log("getProjects action called");

    const { data } = await API.get("/project/getProjects");
    // console.log("Recieved data from server: ", data);
    dispatch({ type: "GET_PROJECTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProject = (projectId) => async (dispatch) => {
  try {
    await API.delete("/project/deleteProject", projectId);
    dispatch({ type: "DELETE_PROJECT", payload: projectId });
  } catch (error) {
    console.log(error);
  }
};

export const likeProject = (projectId) => async (dispatch) => {
  try {
    await API.post("/project/likeProject", { projectId });
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
