require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());
const connect = require("./configs/db");
const cors = require("cors");
const passport = require("./configs/google-oauth");
const { register, login, newToken } = require("./controllers/auth.controller");
app.post("/register", register);
app.post("/login", login);


const userController = require("./controllers/user.controller");
const bookController = require("./controllers/book.controller");
const roleController = require("./controllers/role.controller");


app.use(cors());

app.use("/users", userController);
app.use("/books", bookController);
app.use("/roles", roleController);

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

app.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		// successRedirect: "/auth/google/success",
		failureRedirect: "/auth/google/failure",
	}),
	(req, res) => {
		const token = newToken(req.user);
		return res.status(200).send({ user: req.user, token });
		// return res.send(req.user)
	}
);

app.listen(8000, async () => {
	try {
		await connect();
		console.log(`App is Listening on Port 8000`);
	} catch (e) {
		console.log(e.message);
	}
});
