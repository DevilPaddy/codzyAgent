import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    code: {
      html: { type: String, required: true },
    },
  },
  {
    timestamps: true, 
  }
);

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;