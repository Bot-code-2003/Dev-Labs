const initialState = {
  projects: [],
  clickedProject: null,
  projectLikes: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROJECTS":
      return { ...state, projects: action.payload };

    case "CLICKED_PROJECT":
      return {
        ...state,
        clickedProject: action.payload,
        // Set projectLikes based on the clicked project's likes
        projectLikes: action.payload.projectLikes || [], // Ensure it has a default value if not available
      };

    case "LIKE_PROJECT":
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project._id === action.payload.projectId) {
            return {
              ...project,
              projectLikes: [...project.projectLikes, action.payload.userId], // Corrected to use project.projectLikes
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
              projectLikes: project.projectLikes.filter(
                // Fixed typo in filter method
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
              projectViews: (project.projectViews || 0) + 1, // Handle projectViews being undefined
            };
          }
          return project;
        }),
      };

    default:
      return state;
  }
};
