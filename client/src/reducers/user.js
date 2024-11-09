import { jwtDecode } from "jwt-decode";

const initialState = {
  authData: null,
  authorInfo: null,
  milestone: "",
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
      const skills = action.payload.skills;
      const currentPosition = action.payload.currentPosition;
      const college = action.payload.college;
      const nation = action.payload.nation;
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
          skills,
          currentPosition,
          college,
          nation,
        })
      );

      return { ...state, authData: action.payload };

    case "CLEAR_MILESTONE":
      return { ...state, milestone: "" };
    case "GET_USER_INFO":
      return {
        ...state,
        authorInfo: action.payload, // Store the fetched author info
      };

    case "EDIT_USER_DETAILS":
      return { ...state, user: { ...state.user, ...action.payload } }; // Update user details

    case "SUBMIT_MILESTONE":
      return {
        ...state,
        milestone: action.payload,
      };
    default:
      return state;
  }
};
