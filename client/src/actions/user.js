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
    console.log(data);

    const action = {
      type: "LOGIN",
      payload: data,
    };
    dispatch(action);
    navigate("/");
  } catch (error) {
    console.log(error);
    alert("Invalid Credentials");
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
    navigate("/");
  } catch (error) {
    console.log(error);
    alert("Email already exists");
  }
};

/** Edit image action*/
export const editImage = (changedImage, userId) => async (dispatch) => {
  try {
    console.log("editImage action called");
    // console.log(changedImage);
    console.log(userId);
    await API.patch("/user/editImage", { changedImage, userId });
    console.log("Image updated successfully");
  } catch (error) {
    console.log(error);
  }
};

export const getUserInfo = (userId) => async (dispatch) => {
  try {
    console.log("getUserInfo action called", userId);

    const { data } = await API.get(`/user/getUserInfo/${userId}`);
    console.log("Received user info from server: ", data);
    dispatch({ type: "GET_USER_INFO", payload: data });
  } catch (error) {
    console.log(error);
  }
};
