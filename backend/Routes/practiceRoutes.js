const router = require("express").Router();
const practiceController = require("../Controller/practiceController");

//Route url to register user.
router.post("/create_practice", practiceController.PracticeDetails);
router.get("/get_practice", practiceController.getPracticeDetails);

module.exports = router;
