import { jwtDecode } from "jwt-decode";

const initialState = {
  authData: null,
  authorInfo: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      const decodedData = jwtDecode(action.payload.token);
      const name = action.payload.name;
      const userId = action.payload.userId;
      const profileImage = action.payload.profileImage;
      const headline = action.payload.headline;
      const bio = action.payload.bio;
      const email = action.payload.email;
      const createdAt = action.payload.createdAt;

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...decodedData,
          name,
          userId,
          profileImage,
          headline,
          bio,
          email,
          createdAt,
        })
      );

      return { ...state, authData: action.payload };

    case "GET_USER_INFO":
      return {
        ...state,
        authorInfo: action.payload, // Store the fetched author info
      };

    default:
      return state;
  }
};
