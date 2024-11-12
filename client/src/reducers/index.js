import { combineReducers } from "redux";
import projects from "./projects.js";
import users from "./user.js";
import reviews from "./reviews.js";
import articles from "./articles.js";

export default combineReducers({ users, projects, reviews, articles });
