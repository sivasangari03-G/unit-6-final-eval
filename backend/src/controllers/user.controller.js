const express = require('express')
const router = express.Router();

const User = require('../models/user.model');

router.get("/", async (req, res) => {
	try {
		const users = await User.find().lean().exec();
		return res.send(users); 
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id).lean().exec();
		res.status(200).json(user);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.post("/", async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.status(201).json(user);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.patch("/:id", async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.status(201).json(user);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id).lean().exec();
		res.status(201).json(user);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});


module.exports = router;