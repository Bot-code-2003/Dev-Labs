import { combineReducers } from "redux";
import projects from "./projects.js";
import users from "./user.js";

export default combineReducers({ users, projects });
