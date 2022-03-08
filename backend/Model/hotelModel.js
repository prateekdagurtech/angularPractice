const mongoose = require("mongoose");
//Model for user details.
const hotelSchema = new mongoose.Schema(
	{
		hotel_name: {
			type: String,
			required: true,
			trim: true,
		},
		hotel_type: {
			type: String,
			required: true,
			unique: true,
		},
		hotel_address: {
			type: String,
			required: true,
			unique: true,
		},

		// veg: {
		// 	type: String,
		// 	required: true,
		// },
		// fruit: {
		// 	type: String,
		// 	required: true,
		// },
	},
	{
		timestamps: true,
	},
);
//Exporting file and set collection name user.
module.exports = mongoose.model("Hotel", hotelSchema);
