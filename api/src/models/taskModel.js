//DEPENDENCES
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  completed: { type: Boolean, required: true, default: false },
  taskName: { type: String, required: true, unique: true },
  creationDate: { type: Date, default: Date.now },
  doneTime: { type: Date },
});

module.exports = mongoose.model("Task", TaskSchema);
