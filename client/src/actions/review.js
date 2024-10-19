import axios from "axios";

// const API = axios.create({ baseURL: "https://dev-labs-server.vercel.app" });

const API = axios.create({ baseURL: "http://localhost:5000" });

export const addReview = () => async (dispatch) => {};

export const upvoteReview = () => async (dispatch) => {};

export const replyToReview = () => async (dispatch) => {};
