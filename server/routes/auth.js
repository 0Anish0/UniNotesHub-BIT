const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");
const User = require("../models/User");

router.get("/", verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user)
			return res
				.status(400)
				.json({ sucess: false, message: "User not found" });
		res.json({ success: true, user });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
});

router.post("/register", async (req, res) => {
	const { username, password } = req.body;

	//Simple validation
	if (!username || !password)
		return res.status(400).json({
			success: false,
			message: "Missing username and/or password",
		});
	try {
		//Check for existing user
		const user = await User.findOne({ username });
		if (user)
			return res
				.status(400)
				.json({ success: false, message: "Username already exists" });

		//All conditions met for registration
		const hashedPassword = await argon2.hash(password);
		const newUser = new User({ username, password: hashedPassword });
		await newUser.save();

		//RETURN TOKEN FOR USER
		const accessToken = jwt.sign(
			{ userId: newUser._id },
			process.env.ACCESS_TOKEN_SECRET
		);
		res.json({
			success: true,
			message: "User created succesfully",
			accessToken,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
});

router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	console.log(req.body);
	//Validation
	if (!username || !password) {
		return res.status(400).json({
			success: false,
			message: "Missing username and/or passwordd",
		});
	}

	try {
		//CHECK EXISTING USERPROFILE
		const user = await User.findOne({ username });
		if (!user)
			return res.status(400).json({
				success: false,
				message: "Incorrect username/password",
			});

		//username found
		const passwordValid = await argon2.verify(user.password, password);
		if (!passwordValid)
			return res.status(400).json({
				success: false,
				message: "incorrect username or password",
			});

		//ALL TRUE

		const accessToken = jwt.sign(
			{ userId: user._id },
			process.env.ACCESS_TOKEN_SECRET
		);
		res.json({
			success: true,
			message: "User login succesfully",
			accessToken,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
});

module.exports = router;