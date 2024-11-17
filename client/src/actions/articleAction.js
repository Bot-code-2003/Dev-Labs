import axios from "axios";

const API = axios.create({ baseURL: "https://dev-labs-server.vercel.app" });
// const API = axios.create({ baseURL: "http://localhost:5000" });

export const incrementViews = (slug) => async (dispatch) => {
  try {
    dispatch({ type: "INCREMENT_VIEWS", payload: slug });
    await API.patch("/article/incViews", { slug });
  } catch (error) {
    console.log(error);
  }
};

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

export const submitArticle =
  (title, description, markdown, articleHeaderImage, imageCredit, slug) =>
  async (dispatch) => {
    console.log(
      "submitArticle action called",
      title,
      description,
      markdown,
      articleHeaderImage,
      imageCredit,
      slug
    );

    const { data } = await API.post("/article/submit", {
      title,
      description,
      markdown,
      articleHeaderImage,
      imageCredit,
      slug,
    });

    console.log("Recieved data: ", data);
  };
