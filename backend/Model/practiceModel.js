const mongoose = require("mongoose");
//Model for user details.
const practiceSchema = new mongoose.Schema(
	{
		title: {
			type: String,
		},
		month: {
			type: String,
		},
		total_period: {
			type: String,
		},
		benefits: [
			{
				type: String,
				default: "Not Available",
			},
		],
	},
	{
		timestamps: true,
	},
);
//Exporting file and set collection name user.
module.exports = mongoose.model("Practice", practiceSchema);
