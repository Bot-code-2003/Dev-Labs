const initialState = {
  projects: [],
  clickedProject: null,
  projectLikes: [],
  userProjects: [], // New state for user-specific projects
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROJECTS":
      return {
        ...state,
        projects:
          action.payload.currentPage === 1
            ? action.payload.projects
            : [...state.projects, ...action.payload.projects],
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };

    case "GET_USER_PROJECTS":
      return { ...state, userProjects: action.payload }; // New case for user projects

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
        clickedProject:
          state.clickedProject &&
          state.clickedProject._id === action.payload.projectId
            ? {
                ...state.clickedProject,
                projectLikes: [
                  ...state.clickedProject.projectLikes,
                  action.payload.userId,
                ],
              }
            : state.clickedProject,
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
        clickedProject:
          state.clickedProject &&
          state.clickedProject._id === action.payload.projectId
            ? {
                ...state.clickedProject,
                projectLikes: state.clickedProject.projectLikes.filter(
                  (userId) => userId !== action.payload.userId
                ),
              }
            : state.clickedProject,
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
        clickedProject:
          state.clickedProject && state.clickedProject._id === action.payload
            ? {
                ...state.clickedProject,
                projectViews: (state.clickedProject.projectViews || 0) + 1,
              }
            : state.clickedProject,
      };

    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
        userProjects: state.userProjects.filter(
          (project) => project._id !== action.payload
        ),
      };

    default:
      return state;
  }
};
