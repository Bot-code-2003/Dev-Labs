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

    case "LIKE_PROJECT":
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project._id === action.payload.projectId) {
            return {
              ...project,
              projectLikes: [...projectLikes, action.payload.userId],
            };
          }
          return project;
        }),
      };

    case "UNLIKE_PROJECT":
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project._id === action.payload.projectId) {
            return {
              ...project,
              projectLikes: projectLikes.filrer(
                (userId) => userId !== action.payload.userId
              ),
            };
          }
          return project;
        }),
      };

    case "INC_PROJECT_VIEW":
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project._id === action.payload) {
            return {
              ...project,
              projectViews: project.projectViews + 1,
            };
          }
          return project;
        }),
      };
    default:
      return state;
  }
};
