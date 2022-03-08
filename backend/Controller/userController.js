const User = require("../Model/userModel");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("mySecretKey");
const sgMail = require("@sendgrid/mail");

const userController = {
	//Function to register the user.
	userDetails: async (req, res) => {
		try {
			const { name, email, password } = req.body;
			// const user = await User.findOne({ email });
			// if (user) {
			// 	return res.status(400).json({ msg: "this user is already exists." });
			// }
			const encryptedPassword = cryptr.encrypt(password);
			//Saving user.
			const newUser = new User({
				name,
				email,
				password: encryptedPassword,
			});
			await newUser.save();
			const sendgridAPIKey = process.env.sendgrid_KEY;
			console.log(sendgridAPIKey);
			sgMail.setApiKey(sendgridAPIKey);
			const sendGridMail = (email, name) => {
				console.log(email, name, "111111111");
				sgMail.send({
					to: email,
					from: "prateekdagur8@gmail.com",
					subject: "Sending with SendGrid",
					text: `user ${name} has been created`,
				});
			};
			sendGridMail(newUser.email, newUser.name);
			res.json({
				msg: "user details created",
				user: {
					newUser,
				},
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	forgotPassword: async (req, res) => {
		try {
			const { email } = req.body;
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ msg: "user does not exist" });
			}
			//Saving user.

			const token = jwt.sign({ id: user._id }, process.env.RESET_PASSWORD, {
				expiresIn: "20m",
			});

			const sendgridAPIKey = process.env.sendgrid_KEY;
			console.log(sendgridAPIKey);
			sgMail.setApiKey(sendgridAPIKey);
			const sendGridMail = (email) => {
				sgMail.send({
					to: email,
					from: "prateekdagur8@gmail.com",
					subject: "Sending with SendGrid",
					html: `${process.env.URL}/resetpassword/${token}`,
				});
			};

			const update_resetLink = await User.updateOne(
				{ resetLink: token },
				{ _id: user._id },
			);
			if (!update_resetLink) {
				return res.status(400).json({ msg: "Link error" });
			} else {
				sendGridMail(user.email);
			}
			res.json({ msg: "email has been sent" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	resetPassword: async (req, res) => {
		try {
			const resetLink = req.params.resetLink;
			const { password, confirmPassword } = req.body;

			if (password != confirmPassword) {
				return res
					.status(400)
					.json({ msg: "password should match confirm password" });
			}
			jwt.verify(resetLink, process.env.RESET_PASSWORD, (err, user) => {
				if (err) {
					return res
						.status(400)
						.json({ msg: "Incorrect Token or it is expired" });
				}
			});
			const user = await User.findOne({ resetLink });
			if (!user) {
				return res
					.status(400)
					.json({ msg: "user with this token does not exist" });
			}
			const update = await User.findOne(
				{ _id: user._id },
				{
					password: password,
					resetLink: "",
				},
			);

			res.json({
				msg: "user password is updated created",
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to get the user
	getUser: async (req, res) => {
		try {
			const user = await User.find();
			if (!user) {
				return res.status(400).json({ msg: "users do not exist" });
			}
			console.log(user);
			res.json(user);
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//update API
	updateUser: async (req, res) => {
		try {
			id = req.params.userid;
			const updateduser = await User.updateOne(
				{ _id: id },
				{
					name: req.body.name,
					email: req.body.email,
				},
			);
			if (!updateduser) {
				return res
					.status(201)
					.json({ msg: "Token is not updated successfully!" });
			}
			res.json({
				msg: "Token is updated!",
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

const createAccessToken = (user) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

module.exports = userController;
