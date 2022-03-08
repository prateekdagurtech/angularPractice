require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
//test
//App config
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
//app.use(cors);
app.use(
	cors({
		origin: "http://localhost:4200",
	}),
);

//routes
app.use("/api", require("./Routes/userRoutes"));
app.use("/api", require("./Routes/practiceRoutes"));

mongoose.connect(
	process.env.CON_URL,
	{
		useNewUrlParser: true,
		//useCreateIndex: true,
		useUnifiedTopology: true,
		//useFindAndModify: false,
	},
	(err) => {
		if (err) throw err;
		console.log("connected to mongodb");
	},
);
//listener
if (process.env.NODE_ENV === "production") {
	app.use(express.static("frontend/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
	});
}

//listener
const port = process.env.PORT;
app.listen(port, () => {
	console.log(`listening port localhost : ${port}`);
});
