const Hotel = require("../Model/hotelModel");
const hotelController = {
	//Function to register the user.
	hotelDetails: async (req, res) => {
		try {
			const { hotel_name, hotel_type, hotel_address } = req.body;
			const hotel = await Hotel.findOne({ hotel_name });
			if (hotel) {
				return res.status(400).json({ msg: "this hotel is already exists." });
			}
			//Saving user.
			const newHotel = new Hotel({
				hotel_name,
				hotel_type,
				hotel_address,
			});
			await newHotel.save();

			res.json({
				msg: "hotel is created",
				hotel: {
					newHotel,
				},
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to get the user
	getHotel: async (req, res) => {
		try {
			const hotel = await Hotel.find();
			if (!hotel) {
				return res.status(400).json({ msg: "hotels are not available" });
			}
			res.json(hotel);
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

module.exports = hotelController;
