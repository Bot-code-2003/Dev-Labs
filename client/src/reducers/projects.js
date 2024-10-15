const initialState = {
  projects: [],
  clickedProject: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROJECTS":
      return { ...state, projects: action.payload };
    case "CLICKED_PROJECT":
      return {
        ...state,
        clickedProject: action.payload,
      };
    default:
      return state;
  }
};
