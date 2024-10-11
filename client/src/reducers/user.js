import { jwtDecode } from "jwt-decode";

export default (state = { authData: null }, action) => {
  switch (action.type) {
    case "LOGIN":
      const decodedData = jwtDecode(action.payload.token);
      localStorage.setItem("user", JSON.stringify({ ...decodedData }));
      return { ...state, authData: action.payload };
    default:
      return state;
  }
};
