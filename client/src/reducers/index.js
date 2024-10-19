import { combineReducers } from "redux";
import projects from "./projects.js";
import users from "./user.js";
import reviews from "./reviews.js";

export default combineReducers({ users, projects, reviews });
