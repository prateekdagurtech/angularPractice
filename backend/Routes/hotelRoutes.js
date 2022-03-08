const router = require("express").Router();
const hotelController = require("../Controller/hotelController");

//Route url to register user.
router.post("/create_hotel", hotelController.hotelDetails);
router.get("/get_hotels", hotelController.getHotel);

module.exports = router;
