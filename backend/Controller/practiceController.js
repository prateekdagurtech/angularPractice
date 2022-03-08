const Practice = require("../Model/practiceModel");
const practiceController = {
	//Function to register the user.
	PracticeDetails: async (req, res) => {
		try {
			console.log("11111111111");

			const { title, month, total_period, benefits } = req.body;
			console.log(title, month, total_period, benefits, "2222222222");
			// const practice = await Practice.findOne({ title });
			// if (practice) {
			// 	return res.status(400).json({ msg: "this hotel is already exists." });
			// }
			//Saving user.
			const newPractice = await Practice.create({
				title,
				month,
				total_period,
			});

			await newPractice.save();
			if (benefits.length === 0) {
				console.log("check");
				var newprac = await Practice.updateOne(
					{ _id: newPractice._id },
					{ $push: { benefits: "Not Available" } },
				);
			}
			for (i = 0; i < benefits.length; i++) {
				console.log(benefits[i].benefit, "value");
				var newprac = await Practice.updateOne(
					{ _id: newPractice._id },
					{ $push: { benefits: benefits[i].benefit } },
				);
			}
			res.json({
				msg: "practice is created",
				practice: {
					newPractice,
				},
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to get the user
	getPracticeDetails: async (req, res) => {
		try {
			const prac = await Practice.find();

			if (!prac) {
				return res.status(400).json({ msg: "array is not available" });
			}

			// const pract = [];
			// for (i = 0; i < prac.length; i++) {
			// 	console.log(prac[i], "bbbbbb");
			// 	pract.push(prac[i]);
			// 	for (j = 0; j < prac[i].benefits.length; j++) {
			// 		pract.push(prac[i].benefits[j]);
			// 	}
			// }
			// console.log(pract, "pppppppppp");

			res.json(prac);
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

module.exports = practiceController;
