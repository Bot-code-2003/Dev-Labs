import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // milestones : {

    // }
    milestonesAchieved: {
      type: [String],
      default: [],
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    headline: {
      type: String,
    },
    bio: {
      type: String,
    },
    profileImage: {
      type: String,
      default: "/placeholder.svg?height=250&width=250",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt automatically

export default mongoose.model("User", userSchema);
