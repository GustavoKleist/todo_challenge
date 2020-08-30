//DEPENDENCES
const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
//CONTROLLER
const ProjectController = require("../controllers/projectController");

//ROUTES
router.get("/getProject", checkAuth, ProjectController.project_get);

router.post("/createProject", checkAuth, ProjectController.project_create);

router.delete(
  "/deleteProject/:projectId",
  checkAuth,
  ProjectController.project_delete
);

router.patch("/updateProject", checkAuth, ProjectController.project_update);

router.post("/createTask", checkAuth, ProjectController.task_create);

router.patch("/deleteTask", checkAuth, ProjectController.task_delete);

router.patch("/completeTask", checkAuth, ProjectController.task_complete);

router.patch("/updateTask", checkAuth, ProjectController.task_update);

module.exports = router;
