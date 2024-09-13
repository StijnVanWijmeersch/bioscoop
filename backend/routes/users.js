const express = require("express");
const usersController = require("../controllers/users_controller");
const router = express.Router();
const userValidator = require("../validators/user_validator");

//USER ENDPOINTS

//*POST: /users
router.post("/", userValidator.newUserModelValidator, usersController.create);



module.exports = router;