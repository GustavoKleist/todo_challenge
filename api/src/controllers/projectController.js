//DEPENDENCES
const mongoose = require("mongoose");
//MODELS
const Project = require("../models/projectModel");
const Task = require("../models/taskModel");

exports.project_get = (req, res) => {
  Project.find()
    .where({ ownerId: req.userData.userId })
    .exec()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.project_create = (req, res) => {
  const project = new Project({
    _id: new mongoose.Types.ObjectId(),
    ownerId: req.userData.userId,
    projectName: req.body.projectName,
  });
  project
    .save()
    .then(() => {
      res.status(201).json({
        message: "Project Created",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.project_delete = (req, res) => {
  Project.deleteOne({ _id: req.params.projectId })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.project_update = (req, res) => {
  Project.updateOne(
    { _id: req.body.projectId },
    { $set: { projectName: req.body.newProjectName } },
    { multi: false }
  )
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.task_create = (req, res) => {
  const task = new Task({
    taskName: req.body.taskName,
  });

  Project.updateOne({ _id: req.body.id }, { $push: { taskList: task } })
    .exec()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.task_delete = (req, res) => {
  Project.updateOne(
    { _id: req.body.id },
    { $pull: { taskList: { taskName: req.body.task } } },
    { multi: false }
  )
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.task_complete = (req, res) => {
  Project.updateOne(
    { "taskList.taskName": req.body.task },
    {
      $set: { "taskList.$.completed": true, "taskList.$.doneTime": new Date() },
    },
    { multi: false }
  )
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.task_update = (req, res) => {
  Project.updateOne(
    { "taskList.taskName": req.body.taskName },
    {
      $set: { "taskList.$.taskName": req.body.newTaskName },
    },
    { multi: false }
  )
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
