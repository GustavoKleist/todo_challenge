//DEPENDENCES
const express = require("express");
const router = express.Router();
//CONTROLLER
const UserController = require("../controllers/userController");

//ROUTES
router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

module.exports = router;
