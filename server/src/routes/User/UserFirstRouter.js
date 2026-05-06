const { Router } = require("express");
const userController = require("../../controllers/UserController.js");

const router = Router();

router
   .route("/register")
   .post(userController.createFirstUser)


router
   .route("/total-registered")
   .get(userController.getTotalUsers)

module.exports = router;