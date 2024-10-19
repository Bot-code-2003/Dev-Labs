import { jwtDecode } from "jwt-decode";

export default (state = { authData: null }, action) => {
  switch (action.type) {
    case "LOGIN":
      const decodedData = jwtDecode(action.payload.token);
      const name = action.payload.name;
      const userId = action.payload.userId;
      const authorImage = action.payload.authorImage;
      localStorage.setItem(
        "user",
        JSON.stringify({ ...decodedData, name, userId, authorImage })
      );
      return { ...state, authData: action.payload };
    default:
      return state;
  }
};
