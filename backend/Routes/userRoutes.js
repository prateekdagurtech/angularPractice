const router = require("express").Router();
const userController = require("../Controller/userController");

//Route url to register user.
router.post("/create_user", userController.userDetails);
router.post("/forgot_password", userController.forgotPassword);
router.post("/reset_password", userController.resetPassword);
router.get("/get_users", userController.getUser);
router.put("/update_user/:userid", userController.updateUser);

module.exports = router;
