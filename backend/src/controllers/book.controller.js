const express = require("express");
const router = express.Router();

const Book = require("../models/book.model")

router.get("", async (req, res) => {
	try {
		const books = await Book.find()
			.populate({ path: "author_id", select: ["name"] })
			.lean()
			.exec();
		return res.send(books); 
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const book = await Book.findById(req.params.id).lean().exec();
		return res.status(200).json(book);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.post("", async (req, res) => {
	try {
		const book = await Book.create(req.body);
		return res.status(201).json(book);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.patch("/:id", async (req, res) => {
	try {
		const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		return res.status(201).json(book);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const book = await Book.findByIdAndDelete(req.params.id).lean().exec();
		res.status(201).json(book);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

module.exports = router;