const MilestoneNotification = ({ milestone, closePopup }) => {
  const formatMilestone = (milestone) =>
    milestone.toLowerCase().replace(/\s+/g, "");

  const milestoneMessages = {
    firstprojectshared: {
      title: "First Project Shared",
      message: "You've taken the first step in your creative journey.",
      icon: "🚀",
    },
    firstupvote: {
      title: "First Upvote Received",
      message: "Your work is making an impact.",
      icon: "⭐",
    },
    firstcomment: {
      title: "First Comment Received",
      message: "You're sparking conversations.",
      icon: "💬",
    },
    // Add more milestones as needed
  };

  const { title, message, icon } = milestoneMessages[
    formatMilestone(milestone)
  ] || {
    title: "New Milestone Achieved",
    message: "Keep up the great work!",
    icon: "🏆",
  };

  return (
    <div className="fixed top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-md bg-white text-gray-800 p-4 rounded-sm shadow-2xl z-50">
      <div className="flex items-center space-x-4">
        <div className="text-3xl">{icon}</div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold truncate">{title}</h2>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
        <button
          className="text-gray-400 hover:text-gray-600"
          onClick={() => closePopup()}
          aria-label="Close notification"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default MilestoneNotification;
