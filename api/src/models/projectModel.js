//DEPENDENCES
const mongoose = require("mongoose");
const Task = require("./taskModel");

const ProjectSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    ownerId: { type: mongoose.Schema.Types.ObjectId, required: true },
    projectName: { type: String, required: true },
    taskList: [],
  },
  { collection: "projects" }
);

module.exports = mongoose.model("Project", ProjectSchema);
