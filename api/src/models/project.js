const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      trim: true,
      type: String
    },
    owner: {
      ref: "User",
      required: true,
      type: mongoose.Schema.Types.ObjectId
    }
  },
  {
    timestamps: true
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
