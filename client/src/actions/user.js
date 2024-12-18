import axios from "axios";

const API = axios.create({ baseURL: "https://dev-labs-server.vercel.app" });

// const API = axios.create({ baseURL: "http://localhost:5000" });

/**
 *
 * @param {email and password} formData
 * @param {navigate function to redirect} navigate
 * @returns
 */
export const login = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await API.post("/user/login", formData); // Contains the {token: token}
    // console.log(data);

    const action = {
      type: "LOGIN",
      payload: data,
    };
    dispatch(action);
    navigate("/projects");
  } catch (error) {
    console.log(error);
    alert("Invalid Credentials");
  }
};

export const clearMilestone = () => async (dispatch) => {
  try {
    dispatch({ type: "CLEAR_MILESTONE" });
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param {firstname, lastname, email, password} formData
 * @param {navigate function to redirect} navigate
 * @returns
 */
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await API.post("/user/signup", formData); // Contains the {token: token}
    const action = {
      type: "LOGIN",
      payload: data,
    };
    dispatch(action);
    navigate("/projects");
  } catch (error) {
    console.log(error);
    alert("Email already exists");
  }
};

/** Edit image action*/
export const editImage = (changedImage, userId) => async (dispatch) => {
  try {
    // console.log("editImage action called");
    // console.log(changedImage);
    // console.log(userId);
    await API.patch("/user/editImage", { changedImage, userId });
    console.log("Image updated successfully");
  } catch (error) {
    console.log(error);
  }
};

// Redux Action to Edit User Details
export const editUserDetails = (updatedDetails, userId) => async (dispatch) => {
  try {
    console.log("editUserDetails action called", updatedDetails);

    const { data } = await API.patch(
      `/user/editDetails/${userId}`,
      updatedDetails
    );

    dispatch({ type: "EDIT_USER_DETAILS", payload: data });
  } catch (error) {
    console.error("Edit user details error:", error);
  }
};

export const getUserInfo = (userId) => async (dispatch) => {
  try {
    // console.log("getUserInfo action called", userId);

    const { data } = await API.get(`/user/getUserInfo/${userId}`);
    // console.log("Received user info from server: ", data);
    dispatch({ type: "GET_USER_INFO", payload: data });
  } catch (error) {
    console.log(error);
  }
};
