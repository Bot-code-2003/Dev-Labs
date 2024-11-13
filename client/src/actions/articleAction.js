import axios from "axios";

const API = axios.create({ baseURL: "https://dev-labs-server.vercel.app" });
// const API = axios.create({ baseURL: "http://localhost:5000" });

export const getArticle = (slug) => async (dispatch) => {
  try {
    console.log("getArticle action called", slug);

    const { data } = await API.get(`/article/getArticle/${slug}`);
    console.log("getArticle action called", data);

    dispatch({ type: "GET_ARTICLE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getArticles = () => async (dispatch) => {
  try {
    const { data } = await API.get("/article/getArticles");
    dispatch({ type: "GET_ARTICLES", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getArticlesByCategoryAll = (category) => async (dispatch) => {
  try {
    const { data } = await API.get(
      `/article/getArticlesByCategoryAll/${category}`
    );
    console.log("getArticlesByCategoryAll action called", data);

    dispatch({ type: "GET_ARTICLES_BY_CATEGORY_ALL", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getArticlesByCategory = (category) => async (dispatch) => {
  try {
    console.log("getArticlesByCategory action called", category);

    const { data } = await API.get(
      `/article/getArticlesByCategory/${category}`
    );
    console.log("catedgory  actious: ", data);

    dispatch({ type: "GET_ARTICLES_BY_CATEGORY", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getFeaturedArticles = () => async (dispatch) => {
  try {
    const { data } = await API.get("/article/getFeaturedArticles");
    dispatch({ type: "GET_FEATURED_ARTICLES", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const submitArticle =
  (title, markdown, randomIndex, slug, articleCategory) => async (dispatch) => {
    console.log(
      "submitArticle action called",
      title,
      markdown,
      randomIndex,
      slug,
      articleCategory
    );

    const { data } = await API.post("/article/submit", {
      title,
      markdown,
      randomIndex,
      slug,
      articleCategory,
    });

    console.log("Recieved data: ", data);
  };
