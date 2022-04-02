const express = require("express");
const router = express.Router();

const Role = require("../models/role.model");


router.get("", async (req, res) => {
	try {
		const roles = await Role.find()
		return res.send(roles); //return is not mandatory
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.get("/:id", async (req, res) => {
	try {

		const role = await Role.findById(req.params.id).lean().exec();
		return res.status(200).json(role);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.post("", async (req, res) => {
	try {
		const role = await Role.create(req.body);
		return res.status(201).json(role);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.patch("/:id", async (req, res) => {
	try {
		const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		return res.status(201).json(role);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const role = await Role.findByIdAndDelete(req.params.id).lean().exec();
		res.status(201).json(role);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});


module.exports = router;